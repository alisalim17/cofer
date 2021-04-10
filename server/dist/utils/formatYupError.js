"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatYupError = void 0;
const formatYupError = (err) => {
    const errors = [];
    err.inner.forEach((e) => {
        errors.push({
            field: e.path,
            message: e.message,
        });
    });
    return errors;
};
exports.formatYupError = formatYupError;
//# sourceMappingURL=formatYupError.js.map