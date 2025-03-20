const fetchNumbers = require("../services/fetchNumbers");

const windowSize = 10;
let storedNumbers = [];

exports.getNumbers = async (req, res) => {
    const { numberType } = req.params;
    
    if (!["p", "f", "e", "r"].includes(numberType)) {
        return res.status(400).json({ error: "Invalid number type" });
    }

    const urlMap = {
        "p": "http://20.244.56.144/test/primes",
        "f": "http://20.244.56.144/test/fibo",
        "e": "http://20.244.56.144/test/even",
        "r": "http://20.244.56.144/test/rand"
    };

    try {
        const numbers = await fetchNumbers(urlMap[numberType]);

        const prevState = [...storedNumbers];

        numbers.forEach(num => {
            if (!storedNumbers.includes(num)) {
                if (storedNumbers.length >= windowSize) {
                    storedNumbers.shift();
                }
                storedNumbers.push(num);
            }
        });

        const avg = storedNumbers.length
            ? (storedNumbers.reduce((a, b) => a + b, 0) / storedNumbers.length).toFixed(2)
            : 0;

        res.json({
            windowPrevState: prevState,
            windowCurrState: storedNumbers,
            numbers: numbers,
            avg: parseFloat(avg)
        });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch numbers" });
    }
};
