// boot-pegast.mjs - AUTOMATICALLY GENERATED by boot-env.mjs
export default harden([
    [
        "def",
        "Grammar",
        [
            "act",
            0,
            "Spacing",
            [
                "+",
                "Definition"
            ],
            "EndOfFile"
        ]
    ],
    [
        "def",
        "Definition",
        [
            "act",
            2,
            "Identifier",
            "LEFTARROW",
            "Expression",
            "SEMI",
            [
                "pred",
                1
            ]
        ]
    ],
    [
        "def",
        "Expression",
        [
            "act",
            3,
            [
                "**",
                "Sequence",
                "SLASH"
            ]
        ]
    ],
    [
        "def",
        "Sequence",
        [
            "act",
            5,
            [
                "act",
                4,
                [
                    "*",
                    "Prefix"
                ]
            ],
            [
                "?",
                "HOLE"
            ]
        ]
    ],
    [
        "def",
        "Prefix",
        [
            "or",
            [
                "act",
                6,
                "AND",
                "HOLE"
            ],
            [
                "act",
                7,
                "AND",
                "Suffix"
            ],
            [
                "act",
                8,
                "NOT",
                "Suffix"
            ],
            [
                "val0",
                "Suffix"
            ]
        ]
    ],
    [
        "def",
        "Suffix",
        [
            "or",
            [
                "act",
                9,
                "Primary",
                [
                    "or",
                    [
                        "val0",
                        "STARSTAR"
                    ],
                    [
                        "val0",
                        "PLUSPLUS"
                    ]
                ],
                "Primary"
            ],
            [
                "act",
                10,
                "Primary",
                [
                    "or",
                    [
                        "val0",
                        "QUESTION"
                    ],
                    [
                        "val0",
                        "STAR"
                    ],
                    [
                        "val0",
                        "PLUS"
                    ]
                ]
            ],
            [
                "val0",
                "Primary"
            ]
        ]
    ],
    [
        "def",
        "Primary",
        [
            "or",
            [
                "val0",
                "Super"
            ],
            [
                "val0",
                "Identifier",
                [
                    "peekNot",
                    "LEFTARROW"
                ]
            ],
            [
                "act",
                11,
                "OPEN",
                "Expression",
                "CLOSE"
            ],
            [
                "act",
                12,
                "Literal"
            ],
            [
                "act",
                13,
                "Class"
            ],
            [
                "act",
                14,
                "DOT"
            ],
            [
                "act",
                15,
                "BEGIN"
            ],
            [
                "act",
                16,
                "END"
            ]
        ]
    ],
    [
        "def",
        "Super",
        [
            "act",
            17,
            [
                "lit",
                "super."
            ],
            "Identifier"
        ]
    ],
    [
        "def",
        "Identifier",
        [
            "val0",
            [
                "begin"
            ],
            "IdentStart",
            [
                "*",
                "IdentCont"
            ],
            [
                "end"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "IdentStart",
        [
            "val0",
            [
                "cls",
                "a-zA-Z_"
            ]
        ]
    ],
    [
        "def",
        "IdentCont",
        [
            "or",
            [
                "val0",
                "IdentStart"
            ],
            [
                "val0",
                [
                    "cls",
                    "0-9"
                ]
            ]
        ]
    ],
    [
        "def",
        "Literal",
        [
            "or",
            [
                "val0",
                [
                    "cls",
                    "'"
                ],
                [
                    "begin"
                ],
                [
                    "*",
                    [
                        "val0",
                        [
                            "peekNot",
                            [
                                "cls",
                                "'"
                            ]
                        ],
                        "Char"
                    ]
                ],
                [
                    "end"
                ],
                [
                    "cls",
                    "'"
                ],
                "Spacing"
            ],
            [
                "val0",
                [
                    "cls",
                    "\""
                ],
                [
                    "begin"
                ],
                [
                    "*",
                    [
                        "val0",
                        [
                            "peekNot",
                            [
                                "cls",
                                "\""
                            ]
                        ],
                        "Char"
                    ]
                ],
                [
                    "end"
                ],
                [
                    "cls",
                    "\""
                ],
                "Spacing"
            ]
        ]
    ],
    [
        "def",
        "Class",
        [
            "val0",
            [
                "lit",
                "["
            ],
            [
                "begin"
            ],
            [
                "*",
                [
                    "val0",
                    [
                        "peekNot",
                        [
                            "lit",
                            "]"
                        ]
                    ],
                    "Range"
                ]
            ],
            [
                "end"
            ],
            [
                "lit",
                "]"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "Range",
        [
            "or",
            [
                "val0",
                "Char",
                [
                    "lit",
                    "-"
                ],
                "Char"
            ],
            [
                "val0",
                "Char"
            ]
        ]
    ],
    [
        "def",
        "Char",
        [
            "or",
            [
                "val0",
                [
                    "lit",
                    "\\\\"
                ],
                [
                    "cls",
                    "abefnrtv'\"\\[\\]\\\\\\`\\$"
                ]
            ],
            [
                "val0",
                [
                    "lit",
                    "\\\\"
                ],
                [
                    "cls",
                    "0-3"
                ],
                [
                    "cls",
                    "0-7"
                ],
                [
                    "cls",
                    "0-7"
                ]
            ],
            [
                "val0",
                [
                    "lit",
                    "\\\\"
                ],
                [
                    "cls",
                    "0-7"
                ],
                [
                    "?",
                    [
                        "cls",
                        "0-7"
                    ]
                ]
            ],
            [
                "val0",
                [
                    "lit",
                    "\\\\"
                ],
                [
                    "lit",
                    "-"
                ]
            ],
            [
                "val0",
                [
                    "peekNot",
                    [
                        "lit",
                        "\\\\"
                    ]
                ],
                [
                    "dot"
                ]
            ]
        ]
    ],
    [
        "def",
        "LEFTARROW",
        [
            "val0",
            [
                "lit",
                "<-"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "SLASH",
        [
            "val0",
            [
                "lit",
                "/"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "SEMI",
        [
            "val0",
            [
                "lit",
                ";"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "AND",
        [
            "val0",
            [
                "lit",
                "&"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "NOT",
        [
            "val0",
            [
                "lit",
                "~"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "QUESTION",
        [
            "val0",
            [
                "lit",
                "?"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "STAR",
        [
            "val0",
            [
                "lit",
                "*"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "PLUS",
        [
            "val0",
            [
                "lit",
                "+"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "OPEN",
        [
            "val0",
            [
                "lit",
                "("
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "CLOSE",
        [
            "val0",
            [
                "lit",
                ")"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "DOT",
        [
            "val0",
            [
                "lit",
                "."
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "Spacing",
        [
            "val0",
            [
                "*",
                [
                    "or",
                    [
                        "val0",
                        "Space"
                    ],
                    [
                        "val0",
                        "Comment"
                    ]
                ]
            ]
        ]
    ],
    [
        "def",
        "Comment",
        [
            "val0",
            [
                "lit",
                "#"
            ],
            [
                "*",
                [
                    "val0",
                    [
                        "peekNot",
                        "EndOfLine"
                    ],
                    [
                        "dot"
                    ]
                ]
            ],
            "EndOfLine"
        ]
    ],
    [
        "def",
        "Space",
        [
            "or",
            [
                "val0",
                [
                    "lit",
                    " "
                ]
            ],
            [
                "val0",
                [
                    "lit",
                    "\\t"
                ]
            ],
            [
                "val0",
                "EndOfLine"
            ]
        ]
    ],
    [
        "def",
        "EndOfLine",
        [
            "or",
            [
                "val0",
                [
                    "lit",
                    "\\r\\n"
                ]
            ],
            [
                "val0",
                [
                    "lit",
                    "\\n"
                ]
            ],
            [
                "val0",
                [
                    "lit",
                    "\\r"
                ]
            ]
        ]
    ],
    [
        "def",
        "EndOfFile",
        [
            "val0",
            [
                "peekNot",
                [
                    "dot"
                ]
            ]
        ]
    ],
    [
        "def",
        "HOLE",
        [
            "val0",
            [
                "pred",
                18
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "BEGIN",
        [
            "val0",
            [
                "lit",
                "<"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "END",
        [
            "val0",
            [
                "lit",
                ">"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "PLUSPLUS",
        [
            "val0",
            [
                "lit",
                "++"
            ],
            "Spacing"
        ]
    ],
    [
        "def",
        "STARSTAR",
        [
            "val0",
            [
                "lit",
                "**"
            ],
            "Spacing"
        ]
    ]
]);
//# sourceMappingURL=boot-pegast.mjs.js.map