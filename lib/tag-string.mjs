const tagString = (tag, uri) => {
    function tagged(templateOrFlag, ...args) {
        if (typeof templateOrFlag === 'string') {
            return tag(templateOrFlag);
        }
        const template = templateOrFlag;
        const cooked = template.reduce((prior, t, i) => {
            prior.push(t, String(args[i]));
            return prior;
        }, []);
        cooked.push(template[template.length - 1]);
        const cooked0 = cooked.join('');
        const raw0 = args.reduce((prior, hole, i) => {
            prior.push(String(hole), template.raw[i + 1]);
            return prior;
        }, [template.raw[0]]).join('');
        const tmpl = Object.assign([cooked0], {
            raw: [raw0],
            sources: [{
                    byte: 0,
                    column: 1,
                    line: 1,
                    uri,
                }]
        });
        return tag(tmpl);
    }
    return harden(tagged);
};
export default harden(tagString);
