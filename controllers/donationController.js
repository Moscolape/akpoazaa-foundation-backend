const axios = require("axios");
const Donation = require("../models/donation");

exports.verifyDonation = async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = response.data.data;

    console.log(data);

    if (data.status === "success") {
      const donation = new Donation({
        name: data.authorization.sender_name || "Anonymous",
        email: data.customer.email,
        amount: data.amount / 100,
        reference: data.reference,
        status: data.status,
      });

      await donation.save();

      return res.json({ status: "success", donation });
    } else {
      return res.status(400).json({ status: "failed", message: "Payment not successful" });
    }
  } catch (err) {
    return res.status(500).json({ status: "error", message: err.message });
  }
};
