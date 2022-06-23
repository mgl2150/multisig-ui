import { createTransaction } from "../../../libs/faunaClient";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            try {
                const data = req.body;
                const saveRes = await createTransaction(data);
                res.status(200).send(saveRes.data.data.createTransaction);
            } catch (err) {
                console.log(err.message)
                res.status(400).send(err.message);
            }
    }
    // no route matched
    res.status(405).end();
}
