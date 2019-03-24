// DO NOT EDIT - Generated automatically from interp-jessie.mjs.ts by tessc
// TODO: Hoisting of functionDecls.
import justinEvaluators from './interp-justin.mjs';
import { addBinding, BINDING_GET, BINDING_NAME, BINDING_PARENT, BINDING_SET, doEval, err } from './interp-utils.mjs';
const MAGIC_EXIT = immunize({ toString: () => 'MAGIC_EXIT' });
const getRef = immunize((self, ...astNode) => {
    const [name] = astNode;
    if (name === 'use') {
        return doEval(self, astNode, 'ref');
    }
    return doEval(self, astNode);
});
const doApply = immunize((self, args, formals, body) => {
    // Bind the formals.
    // TODO: Rest arguments.
    formals.forEach((f, i) => addBinding(self, f, true, args[i]));
    // Evaluate the body.
    try {
        return doEval(self, body);
    }
    catch (e) {
        if (Array.isArray(e) && e[0] === MAGIC_EXIT) {
            if (e[1] === 'return') {
                // Some part of the body executed `return`;
                return e[2];
            }
            else {
                err(self) `Invalid exit kind ${{ e: e[1] }}`;
            }
        }
        // Not a magic value, just throw normally.
        throw e;
    }
});
const jessieEvaluators = immunize({
    ...justinEvaluators,
    '='(self, lValue, rValue) {
        const { setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(val);
    },
    '*='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() * val);
    },
    '/='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() / val);
    },
    '%='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() % val);
    },
    '+='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() + val);
    },
    '-='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() - val);
    },
    '<<='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() << val);
    },
    '>>='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() >> val);
    },
    '>>>='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() >>> val);
    },
    '&='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() & val);
    },
    '^='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() ^ val);
    },
    '|='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() | val);
    },
    '**='(self, lValue, rValue) {
        const { getter, setter } = getRef(self, lValue);
        const val = doEval(self, rValue);
        return setter(getter() ** val);
    },
    arrow(self, argDefs, body) {
        return self.evaluators.lambda(self, argDefs, body);
    },
    bind(self, def, expr) {
        const name = doEval(self, def);
        const val = doEval(self, expr);
        return [name, val];
    },
    block(self, statements) {
        // Produce the final value.
        return statements.reduce((_, s) => doEval(self, s), undefined);
    },
    const(self, binds) {
        binds.forEach(b => {
            const [name, val] = doEval(self, b);
            addBinding(self, name, false, val);
        });
    },
    functionDecl(self, def, argDefs, body) {
        const lambda = self.evaluators.lambda(self, argDefs, body);
        const name = doEval(self, def);
        addBinding(self, name, true, lambda);
    },
    get(self, pe, index) {
        const obj = doEval(self, pe);
        return {
            getter: () => obj[index],
            setter: (val) => self.setComputedIndex(obj, index, val),
            thisObj: obj
        };
    },
    index(self, pe, e) {
        const obj = doEval(self, pe);
        const index = doEval(self, e);
        return {
            getter: () => obj[index],
            setter: (val) => self.setComputedIndex(obj, index, val),
            thisObj: obj,
        };
    },
    if(self, c, t, e) {
        const cval = doEval(self, c);
        if (cval) {
            doEval(self, t);
        }
        else if (e) {
            doEval(self, e);
        }
    },
    import(self, def, path) {
        const name = doEval(self, def);
        if (path[0] === '.' && path[1] === '/') {
            // Take the input relative to our current directory.
            path = `${self.dir}${path.slice(1)}`;
        }
        // Interpret with the same endowments.
        const val = self.import(path);
        slog.info `imported ${{ name }} ${{ path }} ${{ val }}`;
        addBinding(self, name, false, val);
    },
    lambda(self, argDefs, body) {
        const formals = argDefs.map(adef => doEval(self, adef));
        const parentEnv = self.env();
        const lambda = (...args) => {
            const oldEnv = self.env();
            try {
                self.env(parentEnv);
                return doApply(self, args, formals, body);
            }
            finally {
                self.env(oldEnv);
            }
        };
        return lambda;
    },
    module(self, body) {
        const oldEnv = self.env();
        try {
            let didExport = false, exported;
            for (const stmt of body) {
                if (stmt[0] === 'exportDefault') {
                    // Handle this production explicitly.
                    if (didExport) {
                        err(self) `Cannot use more than one "export default" statement`;
                    }
                    exported = doEval(self, stmt[1]);
                    didExport = true;
                }
                else {
                    doEval(self, stmt);
                }
            }
            return exported;
        }
        finally {
            self.env(oldEnv);
        }
    },
    ref(self, name) {
        let b = self.env();
        while (b !== undefined) {
            if (b[BINDING_NAME] === name) {
                return { getter: b[BINDING_GET], setter: b[BINDING_SET], thisObj: undefined };
            }
            b = b[BINDING_PARENT];
        }
        err(self) `ReferenceError: ${{ name }} is not defined`;
    },
});
export default immunize(jessieEvaluators);
