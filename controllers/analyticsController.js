
const {
  getTopGainers,
  getTopLosers,
  getHighestPrice,
  getLowestPrice,
  getAveragePrice
} = require("../services/analyticsService");

const topGainers = async (req, res) => {

  try {
    const data = await getTopGainers();
    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

const topLosers = async (req, res) => {

  try {

    const data = await getTopLosers();
    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

const highestPrice = async (req, res) => {

  try {
    const data = await getHighestPrice();
    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

const lowestPrice = async (req, res) => {

  try {

    const data = await getLowestPrice();
    res.json({
      success: true,
      data
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

const averagePrice = async (req, res) => {

  try {

    const data = await getAveragePrice();
    res.json({
      success: true,
      data
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });

  }

};

module.exports = {
  topGainers,
  topLosers,
  highestPrice,
  lowestPrice,
  averagePrice
};