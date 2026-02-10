
const testCases = [
    {
        name: "Length <= 50",
        messages: Array.from({ length: 50 }, (_, i) => ({ role: "user", content: `msg ${i}` })),
        expectedLength: 50,
        expectedFirst: "msg 0"
    },
    {
        name: "Length > 50, No System",
        messages: Array.from({ length: 60 }, (_, i) => ({ role: "user", content: `msg ${i}` })),
        expectedLength: 50,
        expectedFirst: "msg 10" // slice(-50) starts at index 10
    },
    {
        name: "Length > 50, First IS System",
        messages: [
            { role: "system", content: "sys" },
            ...Array.from({ length: 59 }, (_, i) => ({ role: "user", content: `msg ${i}` }))
        ],
        expectedLength: 50,
        expectedFirst: "sys",
        expectedSecond: "msg 11" // msg 0..58 are 59 msgs. Total 60. last 49 are msg 10..58. wait.
        // total 60. slice(-49) takes last 49. Indices 11..59 (if length is 60).
        // msg 0 is at index 1. msg 58 is at index 59.
        // slice(-49) of [sys, msg0...msg58] (length 60).
        // Indices are 0..59. Last index is 59. 59-49+1 = 11. Start index 11.
        // Index 11 is msg 10.
    }
];

function run() {
    for (const t of testCases) {
        let messages = t.messages;
        if (messages.length > 50) {
            const firstMessage = messages[0];
            if (firstMessage?.role === 'system') {
                messages = [firstMessage, ...messages.slice(-49)];
            } else {
                messages = messages.slice(-50);
            }
        }

        if (messages.length !== t.expectedLength) {
            console.error(`FAIL ${t.name}: Expected length ${t.expectedLength}, got ${messages.length}`);
            continue;
        }
        if (t.expectedFirst && messages[0].content !== t.expectedFirst) {
             console.error(`FAIL ${t.name}: Expected first content '${t.expectedFirst}', got '${messages[0].content}'`);
             continue;
        }
         if (t.expectedSecond && messages[1].content !== t.expectedSecond) {
             console.error(`FAIL ${t.name}: Expected second content '${t.expectedSecond}', got '${messages[1].content}'`);
             continue;
        }
        console.log(`PASS ${t.name}`);
    }
}
run();
