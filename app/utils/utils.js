
var util = {
    isValidObjectId: function(str) {
        // Check if the string is exactly 24 characters long and consists of hexadecimal characters
        return /^[0-9a-fA-F]{24}$/.test(str);
    }
}

module.exports = util