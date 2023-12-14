import statisticsService from "../services/statisticsService.js";

const getStatisticsForAdmin = async (req, res, next) => {
    try {
        const statistics = await statisticsService.getStatisticsForAdmin();
        res.json({ statistics });
    } catch (error) {
        next(error);
    }
};

export default {
    getStatisticsForAdmin,
}