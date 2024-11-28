export const getTrackedEvents = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const events = await Event.find({ qrCodeId: id });
      if (!events.length) return res.status(404).json({ message: "No events found for this QR Code" });
  
      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  };

export const getAnalytics = async (req, res, next) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;
  
    try {
      const filter = { qrCodeId: id };
      if (startDate || endDate) {
        filter.timestamp = {};
        if (startDate) filter.timestamp.$gte = new Date(startDate);
        if (endDate) filter.timestamp.$lte = new Date(endDate);
      }
  
      const events = await Event.find(filter);
  
      const analytics = {
        totalScans: events.length,
        uniqueUsers: new Set(events.map(event => event.metadata?.ip)).size,
        scansByDate: events.reduce((acc, event) => {
          const date = event.timestamp.toISOString().split("T")[0];
          acc[date] = (acc[date] || 0) + 1;
          return acc;
        }, {}),
        locationStats: events.reduce((acc, event) => {
          acc[event.location] = (acc[event.location] || 0) + 1;
          return acc;
        }, {}),
      };
  
      res.status(200).json(analytics);
    } catch (error) {
      next(error);
    }
  };
  