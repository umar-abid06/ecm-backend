const sendShopToken = (user, statusCode, res) => {
  try {
    const token = user.getJwtToken(); // Ensure this is working correctly

    // Cookie options
    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    };

    // Send the response with cookie
    res
      .status(statusCode)
      .cookie("seller_token", token, options) // Set the cookie
      .json({
        success: true,
        user,
        token,
      });
  } catch (error) {
    console.error("Error sending shop token:", error.message);
    res.status(500).json({
      success: false,
      message: "Error sending the token. Please try again later.",
    });
  }
};

module.exports = sendShopToken;
