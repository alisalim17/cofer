import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CodeReviewRequest = {
  __typename?: 'CodeReviewRequest';
  id: Scalars['String'];
  numDays?: Maybe<Scalars['Int']>;
  codeUrl: Scalars['String'];
  tags: Array<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  creatorId: Scalars['String'];
  creator: Array<User>;
};

export type CreateCodeReviewRequestInput = {
  numDays?: Maybe<Scalars['Int']>;
  codeUrl: Scalars['String'];
  tags: Array<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
};

export type CreateCodeReviewRequestResponse = {
  __typename?: 'CreateCodeReviewRequestResponse';
  ok: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
  codeReviewRequest?: Maybe<CodeReviewRequest>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCodeReviewRequest: CreateCodeReviewRequestResponse;
  login: RegisterResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
};


export type MutationCreateCodeReviewRequestArgs = {
  input: CreateCodeReviewRequestInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  allUsers?: Maybe<Array<User>>;
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  ok: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type RegularUserFragmentFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type CreateCodeReviewRequestMutationVariables = Exact<{
  input: CreateCodeReviewRequestInput;
}>;


export type CreateCodeReviewRequestMutation = (
  { __typename?: 'Mutation' }
  & { createCodeReviewRequest: (
    { __typename?: 'CreateCodeReviewRequestResponse' }
    & Pick<CreateCodeReviewRequestResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, codeReviewRequest?: Maybe<(
      { __typename?: 'CodeReviewRequest' }
      & Pick<CodeReviewRequest, 'id' | 'numDays' | 'tags' | 'creatorId'>
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragmentFragment
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & RegularUserFragmentFragment
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragmentFragment
  )> }
);

export const RegularUserFragmentFragmentDoc = gql`
    fragment RegularUserFragment on User {
  id
  username
}
    `;
export const CreateCodeReviewRequestDocument = gql`
    mutation CreateCodeReviewRequest($input: CreateCodeReviewRequestInput!) {
  createCodeReviewRequest(input: $input) {
    ok
    errors {
      field
      message
    }
    codeReviewRequest {
      id
      numDays
      tags
      creatorId
    }
  }
}
    `;
export type CreateCodeReviewRequestMutationFn = Apollo.MutationFunction<CreateCodeReviewRequestMutation, CreateCodeReviewRequestMutationVariables>;

/**
 * __useCreateCodeReviewRequestMutation__
 *
 * To run a mutation, you first call `useCreateCodeReviewRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCodeReviewRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCodeReviewRequestMutation, { data, loading, error }] = useCreateCodeReviewRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCodeReviewRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateCodeReviewRequestMutation, CreateCodeReviewRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCodeReviewRequestMutation, CreateCodeReviewRequestMutationVariables>(CreateCodeReviewRequestDocument, options);
      }
export type CreateCodeReviewRequestMutationHookResult = ReturnType<typeof useCreateCodeReviewRequestMutation>;
export type CreateCodeReviewRequestMutationResult = Apollo.MutationResult<CreateCodeReviewRequestMutation>;
export type CreateCodeReviewRequestMutationOptions = Apollo.BaseMutationOptions<CreateCodeReviewRequestMutation, CreateCodeReviewRequestMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    ok
    errors {
      field
      message
    }
    user {
      ...RegularUserFragment
    }
  }
}
    ${RegularUserFragmentFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    ok
    errors {
      field
      message
    }
    user {
      ...RegularUserFragment
    }
  }
}
    ${RegularUserFragmentFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUserFragment
  }
}
    ${RegularUserFragmentFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;