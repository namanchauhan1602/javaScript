import asyncHandler from 'express-async-handler';
import { nanoid } from 'nanoid';
import URL from '../model/urlModel.js';

const getAllURLS = asyncHandler(async (req, res) => {
    const allURLS = await URL.find();
    res.render(allURLS);
});

const generateNewShortURL = asyncHandler(async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url id required' })
    const shortID = nanoid(8);
    URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });
    return res.status(200).json({ id: shortID });
});

const redirectToURL = asyncHandler(async (req, res) => {
    const shortID = req.params.shortID;
    const entry = await URL.findOneAndUpdate({ shortId: shortID }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL);
});

const redirectURLAnalytics = asyncHandler(async (req, res) => {
    const shortID = req.params.shortID;
    const result = await URL.findOne({ shortId: shortID });
    if (result) {
        res.json({
            total_clicks: result.visitHistory.length,
            analytics: result.visitHistory
        });
    }
});

export { generateNewShortURL, redirectToURL, redirectURLAnalytics, getAllURLS }; 