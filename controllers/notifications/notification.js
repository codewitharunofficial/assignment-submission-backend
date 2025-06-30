import NotificationModel from "../../models/NotificationModel.js";

export async function fetchNotifications(req, res) {
  try {
    const notifications = await NotificationModel.find({});
    if (notifications?.length === 0) {
      return res.status(302).send({
        success: false,
        message: "No Notification Available",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Fetched All Notifications Available",
        notifications,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "something went wrong",
      error,
    });
  }
}
