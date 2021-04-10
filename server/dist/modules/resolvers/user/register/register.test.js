"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker = __importStar(require("faker"));
const registirationErrorMessages_1 = require("../../../shared/registirationErrorMessages");
const createRandomUser_1 = require("../../../test-utils/createRandomUser");
const TestClient_1 = require("../../../test-utils/TestClient");
const addedUser = createRandomUser_1.createRandomUser();
describe("register", () => {
    const client = new TestClient_1.TestClient();
    it("invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.register(Object.assign(Object.assign({}, addedUser), { email: "a" }));
        expect(data).toMatchObject({
            ok: false,
            errors: [
                { field: "email", message: registirationErrorMessages_1.errorMessages.emailShort },
                {
                    field: "email",
                    message: registirationErrorMessages_1.errorMessages.invalidEmail,
                },
            ],
            user: null,
        });
    }));
    it("duplicate username", () => __awaiter(void 0, void 0, void 0, function* () {
        const newU = createRandomUser_1.createRandomUser();
        const {} = yield client.register(newU);
        const { data } = yield client.register(newU);
        expect(data).toMatchObject({
            ok: false,
            errors: [{ field: "username", message: "this username already taken" }],
            user: null,
        });
    }));
    it("duplicate email", () => __awaiter(void 0, void 0, void 0, function* () {
        const newU = createRandomUser_1.createRandomUser();
        const {} = yield client.register(newU);
        const { data } = yield client.register(Object.assign(Object.assign({}, newU), { username: faker.internet.userName() }));
        expect(data).toMatchObject({
            ok: false,
            errors: [{ field: "email", message: "this email already taken" }],
            user: null,
        });
    }));
    it("create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const newU = createRandomUser_1.createRandomUser();
        const { data } = yield client.register(newU);
        expect(data.user).toBeDefined();
        expect(data).toMatchObject({
            ok: true,
            errors: null,
            user: {
                email: newU === null || newU === void 0 ? void 0 : newU.email,
                username: newU === null || newU === void 0 ? void 0 : newU.username,
            },
        });
    }));
});
//# sourceMappingURL=register.test.js.map