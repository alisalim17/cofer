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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeLazyQuery = exports.useMeQuery = exports.MeDocument = exports.useRegisterMutation = exports.RegisterDocument = exports.useLoginMutation = exports.LoginDocument = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
exports.LoginDocument = client_1.gql `
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ok
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
function useLoginMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LoginDocument, options);
}
exports.useLoginMutation = useLoginMutation;
exports.RegisterDocument = client_1.gql `
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ok
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
function useRegisterMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.RegisterDocument, options);
}
exports.useRegisterMutation = useRegisterMutation;
exports.MeDocument = client_1.gql `
    query Me {
  me {
    id
    username
  }
}
    `;
function useMeQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.MeDocument, options);
}
exports.useMeQuery = useMeQuery;
function useMeLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.MeDocument, options);
}
exports.useMeLazyQuery = useMeLazyQuery;
//# sourceMappingURL=graphql.js.map