import React from "react";

function MessageError (props) {
    const { type, message, style = { color: "red", marginTop: "7px", fontWeight: "400", fontSize: '14px' } } = props;

    const getMessage = () => {
        if (message) {
            return message;
        }
        switch (type) {
            case "required":
                return "Vui lòng điền thông tin";
            case "minLength":
                return "Vui lòng nhập tối đa số kí tự";
            default:
                break;
        }
    };

    return <p style={style}>{getMessage()}</p>;
}

export default MessageError;