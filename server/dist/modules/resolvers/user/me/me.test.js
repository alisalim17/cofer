"use strict";
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
const createRandomUser_1 = require("../../../test-utils/createRandomUser");
const TestClient_1 = require("../../../test-utils/TestClient");
const addedUser = createRandomUser_1.createRandomUser();
const client = new TestClient_1.TestClient();
describe("me", () => {
    it("return null if no cookie", () => __awaiter(void 0, void 0, void 0, function* () {
        const { data } = yield client.me();
        expect(data).toEqual(null);
    }));
    it("get current user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { cookie } = yield client.register(addedUser);
        const { data } = yield client.me(cookie);
        expect(data).toBeDefined();
        expect(data).toMatchObject({ username: addedUser.username });
    }));
});
//# sourceMappingURL=me.test.js.map