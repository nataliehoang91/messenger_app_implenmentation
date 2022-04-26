import colors from "./colors";

const styles = {
  chatBubbleWrapper: {
    marginBottom: "30px",
  },
  chatBubble: {
    padding: "9px 14px",
    maxWidth: "40%",
    width: "-webkit-fit-content",
  },
  userChatBubble: {
    backgroundColor: colors["primary_color"],
    border: "1px solid " + colors["primary_color"],
    borderRadius: "14px 14px 0 14px",
  },
  recipientChatBubble: {
    backgroundColor: colors["accent_color"],
    border: "1px solid " + colors["recepient_chat_bubble_border"],
    borderRadius: "14px 14px 14px 0",
  },
  userChatBubbleOrientation: {
    justifyContent: "flex-end",
  },
  recipientChatBubbleOrientation: {
    justifyContent: "flex-start",
  },
  userText: {
    color: colors["contrasted_primary_text"],
    fontSize: "1rem",
    overflowWrap: "break-word",
  },
  recipientText: {
    color: colors["contrasted_accent_text"],
    fontSize: "1rem",
    overfloWwrap: "break-word",
  },
  dateTimeText: {
    color: colors["datetime_text"],
  },
};

export default styles;
