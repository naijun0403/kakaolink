exports.NotificationBuilder = (function () {

    function NotificationBuilder() {
        this.builder = new android.app.Notification.Builder(context);
    }

    // please add input box and title, content, edit, delete
    NotificationBuilder.prototype.build = function () {
        return this.builder.build();
    }

    NotificationBuilder.prototype.setSmallIcon = function (icon) {
        this.builder.setSmallIcon(icon);
        return this;
    }

    NotificationBuilder.prototype.setContentTitle = function (title) {
        this.builder.setContentTitle(title);
        return this;
    }

    NotificationBuilder.prototype.setContentText = function (text) {
        this.builder.setContentText(text);
        return this;
    }

    return NotificationBuilder;

})()