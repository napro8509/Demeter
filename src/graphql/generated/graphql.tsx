import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  deviceProfiles: Array<DeviceProfileEntity>;
  id: Scalars['String'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
};

export type CreateCategoryDto = {
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['String']>;
};

export type CreateDeviceDto = {
  deviceProfileId: Scalars['String'];
  deviceSerial?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
};

export type CreateDeviceProfileDto = {
  categoryIds?: InputMaybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateGroupDto = {
  area: Scalars['String'];
  endDate: Scalars['DateTime'];
  imageUrl?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type CreateProjectDto = {
  area: Scalars['String'];
  endDate: Scalars['DateTime'];
  imageUrl?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  location: Scalars['String'];
  longitude?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectType: ProjectType;
  startDate: Scalars['DateTime'];
};

export type CreateUserDeviceDto = {
  deviceId: Scalars['String'];
  deviceProfileId: Scalars['String'];
  groupId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectId?: InputMaybe<Scalars['String']>;
};

export type DeviceEntity = {
  __typename?: 'DeviceEntity';
  deviceProfile?: Maybe<DeviceProfileEntity>;
  deviceProfileId: Scalars['String'];
  deviceSerial?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  keyAndCerts?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type DeviceProfileEntity = {
  __typename?: 'DeviceProfileEntity';
  categories?: Maybe<Array<CategoryEntity>>;
  categoryIds?: Maybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  devices?: Maybe<Array<DeviceEntity>>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum DeviceStatus {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Unknown = 'unknown'
}

export type FetchDto = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type GetThingDto = {
  requests?: InputMaybe<Array<Scalars['String']>>;
};

export type GroupEntity = {
  __typename?: 'GroupEntity';
  area: Scalars['String'];
  creatorId: Scalars['String'];
  devices: Array<DeviceEntity>;
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
  startDate: Scalars['DateTime'];
  type: Scalars['String'];
};

export type ImageEntity = {
  __typename?: 'ImageEntity';
  creatorId?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type LoginDto = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type LoginSocialDto = {
  accessToken?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  provider: SocialProvider;
  socialId?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: LoginResponse;
  createCategory: CategoryEntity;
  createDevice: DeviceEntity;
  createDeviceProfile: DeviceProfileEntity;
  createGroup: GroupEntity;
  createProject: ProjectEntity;
  createUserDevice: UserDeviceEntity;
  login: LoginResponse;
  loginSocial: LoginResponse;
  register: UserEntity;
  removeCategory: Scalars['Boolean'];
  removeDevice: Scalars['Boolean'];
  removeDeviceProfile: Scalars['Boolean'];
  removeGroup: Scalars['Boolean'];
  removeProject: Scalars['Boolean'];
  removeUser: Scalars['Boolean'];
  removeUserDevice: Scalars['Boolean'];
  updateCategory: CategoryEntity;
  updateDevice: DeviceEntity;
  updateDeviceProfile: DeviceProfileEntity;
  updateGroup: GroupEntity;
  updateProject: ProjectEntity;
  updateThingState: Scalars['String'];
  updateUser: UserEntity;
  updateUserDevice: UserDeviceEntity;
  uploadImage: ImageEntity;
};


export type MutationAdminLoginArgs = {
  loginUser: LoginDto;
};


export type MutationCreateCategoryArgs = {
  createCategory: CreateCategoryDto;
};


export type MutationCreateDeviceArgs = {
  device: CreateDeviceDto;
};


export type MutationCreateDeviceProfileArgs = {
  deviceProfile: CreateDeviceProfileDto;
};


export type MutationCreateGroupArgs = {
  group: CreateGroupDto;
};


export type MutationCreateProjectArgs = {
  project: CreateProjectDto;
};


export type MutationCreateUserDeviceArgs = {
  userDevice: CreateUserDeviceDto;
};


export type MutationLoginArgs = {
  loginUser: LoginDto;
};


export type MutationLoginSocialArgs = {
  input: LoginSocialDto;
};


export type MutationRegisterArgs = {
  registerUser: RegisterDto;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDeviceArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDeviceProfileArgs = {
  id: Scalars['String'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['String'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserDeviceArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  updateCategory: UpdateCategoryDto;
};


export type MutationUpdateDeviceArgs = {
  id: Scalars['String'];
  updateDevice: UpdateDeviceDto;
};


export type MutationUpdateDeviceProfileArgs = {
  id: Scalars['String'];
  updateDeviceProfile: UpdateDeviceProfileDto;
};


export type MutationUpdateGroupArgs = {
  id: Scalars['String'];
  updateGroup: UpdateGroupDto;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String'];
  updateProject: UpdateProjectDto;
};


export type MutationUpdateThingStateArgs = {
  state: UpdateThingStateDto;
  thingName: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id?: InputMaybe<Scalars['String']>;
  updateUser: UpdateUserDto;
};


export type MutationUpdateUserDeviceArgs = {
  id: Scalars['String'];
  updateUserDevice: UpdateUserDeviceDto;
};


export type MutationUploadImageArgs = {
  image: Scalars['Upload'];
};

export type ProjectEntity = {
  __typename?: 'ProjectEntity';
  area: Scalars['String'];
  creatorId?: Maybe<Scalars['String']>;
  devices: Array<DeviceEntity>;
  endDate: Scalars['DateTime'];
  groups: Array<GroupEntity>;
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['String']>;
  location: Scalars['String'];
  longitude?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  projectType: ProjectType;
  startDate: Scalars['DateTime'];
};

export enum ProjectType {
  Agriculture = 'agriculture',
  Education = 'education',
  Industrial = 'industrial',
  Medical = 'medical',
  Others = 'others',
  SmartHome = 'smartHome'
}

export type Query = {
  __typename?: 'Query';
  categories: Array<CategoryEntity>;
  category: CategoryEntity;
  device: DeviceEntity;
  deviceProfile: DeviceProfileEntity;
  deviceProfiles: Array<DeviceProfileEntity>;
  devices: Array<DeviceEntity>;
  getProfile: UserEntity;
  getThing: Scalars['String'];
  group: GroupEntity;
  groups: Array<GroupEntity>;
  image: ImageEntity;
  images: Array<ImageEntity>;
  project: ProjectEntity;
  projects: Array<ProjectEntity>;
  user: UserEntity;
  userDevice: UserDeviceEntity;
  userDevices: Array<UserDeviceEntity>;
  users: Array<UserEntity>;
};


export type QueryCategoriesArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryDeviceArgs = {
  id: Scalars['String'];
};


export type QueryDeviceProfileArgs = {
  id: Scalars['String'];
};


export type QueryDeviceProfilesArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryDevicesArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryGetThingArgs = {
  query: GetThingDto;
  thingName: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['String'];
};


export type QueryGroupsArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryImageArgs = {
  id: Scalars['String'];
};


export type QueryImagesArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryProjectsArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};


export type QueryUserDeviceArgs = {
  id: Scalars['String'];
};


export type QueryUserDevicesArgs = {
  fetch?: InputMaybe<FetchDto>;
};


export type QueryUsersArgs = {
  fetch?: InputMaybe<FetchDto>;
};

export enum Role {
  Admin = 'admin',
  User = 'user'
}

export type RegisterDto = {
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export enum SocialProvider {
  Apple = 'apple',
  Demeter = 'demeter',
  Facebook = 'facebook',
  Google = 'google'
}

export type UpdateCategoryDto = {
  name?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
};

export type UpdateDeviceDto = {
  deviceSerial?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<DeviceStatus>;
  token?: InputMaybe<Scalars['String']>;
};

export type UpdateDeviceProfileDto = {
  categoryIds?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  deviceSerial?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateGroupDto = {
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectDto = {
  area?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  projectType: ProjectType;
  startDate?: InputMaybe<Scalars['String']>;
};

export type UpdateThingStateDto = {
  fields: Array<ThingField>;
};

export type UpdateUserDeviceDto = {
  deviceId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserDto = {
  role?: InputMaybe<Role>;
};

export type UserDeviceEntity = {
  __typename?: 'UserDeviceEntity';
  device: DeviceEntity;
  deviceId: Scalars['String'];
  deviceProfileId: Scalars['String'];
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  projectId?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  email: Scalars['String'];
  id: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  projects: Array<ProjectEntity>;
  role?: Maybe<Scalars['String']>;
  userDevices: Array<UserDeviceEntity>;
};

export type ThingField = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type CreateDeviceMutationVariables = Exact<{
  input: CreateDeviceDto;
}>;


export type CreateDeviceMutation = { __typename?: 'Mutation', createDevice: { __typename?: 'DeviceEntity', deviceProfileId: string, deviceSerial?: string | null | undefined, id: string, keyAndCerts?: string | null | undefined, status?: string | null | undefined, token: string } };

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupDto;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'GroupEntity', area: string, creatorId: string, endDate: any, id: string, location: string, name: string, startDate: any, projectId: string } };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectDto;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'ProjectEntity', area: string, creatorId?: string | null | undefined, endDate: any, id: string, imageUrl?: string | null | undefined, latitude?: string | null | undefined, location: string, longitude?: string | null | undefined, name: string, projectType: ProjectType, startDate: any } };

export type RemoveProjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', removeProject: boolean };

export type UploadImageMutationVariables = Exact<{
  input: Scalars['Upload'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: { __typename?: 'ImageEntity', url?: string | null | undefined } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', id: string, name: string, parentId?: string | null | undefined, deviceProfiles: Array<{ __typename?: 'DeviceProfileEntity', categoryIds?: Array<string> | null | undefined, description: string, id: string, name: string }> }> };

export type GetCategoryDetailQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCategoryDetailQuery = { __typename?: 'Query', category: { __typename?: 'CategoryEntity', id: string, name: string, parentId?: string | null | undefined } };

export type GetDeviceProfileDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeviceProfileDetailQuery = { __typename?: 'Query', deviceProfile: { __typename?: 'DeviceProfileEntity', categoryIds?: Array<string> | null | undefined, description: string, id: string, name: string } };

export type GetDevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDevicesQuery = { __typename?: 'Query', devices: Array<{ __typename?: 'DeviceEntity', deviceProfileId: string, deviceSerial?: string | null | undefined, id: string, keyAndCerts?: string | null | undefined, token: string }> };

export type GetGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'GroupEntity', area: string, creatorId: string, endDate: any, id: string, location: string, name: string, projectId: string, startDate: any, type: string }> };

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = { __typename?: 'Query', getProfile: { __typename?: 'UserEntity', email: string, id: string, password: string, phone: string, role?: string | null | undefined, projects: Array<{ __typename?: 'ProjectEntity', area: string, creatorId?: string | null | undefined, endDate: any, id: string, latitude?: string | null | undefined, location: string, longitude?: string | null | undefined, name: string, projectType: ProjectType, startDate: any }> } };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'ProjectEntity', area: string, creatorId?: string | null | undefined, endDate: any, id: string, latitude?: string | null | undefined, location: string, longitude?: string | null | undefined, name: string, projectType: ProjectType, startDate: any, imageUrl?: string | null | undefined, groups: Array<{ __typename?: 'GroupEntity', area: string, creatorId: string, endDate: any, id: string, location: string, name: string, projectId: string, imageUrl?: string | null | undefined, startDate: any, devices: Array<{ __typename?: 'DeviceEntity', deviceProfileId: string, deviceSerial?: string | null | undefined, id: string, keyAndCerts?: string | null | undefined, status?: string | null | undefined, token: string }> }> }> };

export type GetUserDevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserDevicesQuery = { __typename?: 'Query', userDevices: Array<{ __typename?: 'UserDeviceEntity', deviceId: string, deviceProfileId: string, groupId?: string | null | undefined, name: string, id: string, projectId?: string | null | undefined, userId: string }> };


export const CreateDeviceDocument = gql`
    mutation CreateDevice($input: CreateDeviceDto!) {
  createDevice(device: $input) {
    deviceProfileId
    deviceSerial
    id
    keyAndCerts
    status
    token
  }
}
    `;
export type CreateDeviceMutationFn = Apollo.MutationFunction<CreateDeviceMutation, CreateDeviceMutationVariables>;

/**
 * __useCreateDeviceMutation__
 *
 * To run a mutation, you first call `useCreateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceMutation, { data, loading, error }] = useCreateDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeviceMutation(baseOptions?: Apollo.MutationHookOptions<CreateDeviceMutation, CreateDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDeviceMutation, CreateDeviceMutationVariables>(CreateDeviceDocument, options);
      }
export type CreateDeviceMutationHookResult = ReturnType<typeof useCreateDeviceMutation>;
export type CreateDeviceMutationResult = Apollo.MutationResult<CreateDeviceMutation>;
export type CreateDeviceMutationOptions = Apollo.BaseMutationOptions<CreateDeviceMutation, CreateDeviceMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($input: CreateGroupDto!) {
  createGroup(group: $input) {
    area
    creatorId
    endDate
    id
    location
    name
    startDate
    projectId
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectDto!) {
  createProject(project: $input) {
    area
    creatorId
    endDate
    id
    imageUrl
    latitude
    location
    longitude
    name
    projectType
    startDate
    imageUrl
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const RemoveProjectDocument = gql`
    mutation removeProject($id: String!) {
  removeProject(id: $id)
}
    `;
export type RemoveProjectMutationFn = Apollo.MutationFunction<RemoveProjectMutation, RemoveProjectMutationVariables>;

/**
 * __useRemoveProjectMutation__
 *
 * To run a mutation, you first call `useRemoveProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectMutation, { data, loading, error }] = useRemoveProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveProjectMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectMutation, RemoveProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectMutation, RemoveProjectMutationVariables>(RemoveProjectDocument, options);
      }
export type RemoveProjectMutationHookResult = ReturnType<typeof useRemoveProjectMutation>;
export type RemoveProjectMutationResult = Apollo.MutationResult<RemoveProjectMutation>;
export type RemoveProjectMutationOptions = Apollo.BaseMutationOptions<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($input: Upload!) {
  uploadImage(image: $input) {
    url
  }
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: Apollo.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const GetCategoriesDocument = gql`
    query getCategories {
  categories {
    id
    name
    parentId
    deviceProfiles {
      categoryIds
      description
      id
      name
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDetailDocument = gql`
    query getCategoryDetail($id: String!) {
  category(id: $id) {
    id
    name
    parentId
  }
}
    `;

/**
 * __useGetCategoryDetailQuery__
 *
 * To run a query within a React component, call `useGetCategoryDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryDetailQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>(GetCategoryDetailDocument, options);
      }
export function useGetCategoryDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>(GetCategoryDetailDocument, options);
        }
export type GetCategoryDetailQueryHookResult = ReturnType<typeof useGetCategoryDetailQuery>;
export type GetCategoryDetailLazyQueryHookResult = ReturnType<typeof useGetCategoryDetailLazyQuery>;
export type GetCategoryDetailQueryResult = Apollo.QueryResult<GetCategoryDetailQuery, GetCategoryDetailQueryVariables>;
export const GetDeviceProfileDetailDocument = gql`
    query getDeviceProfileDetail {
  deviceProfile(id: "") {
    categoryIds
    description
    id
    name
  }
}
    `;

/**
 * __useGetDeviceProfileDetailQuery__
 *
 * To run a query within a React component, call `useGetDeviceProfileDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeviceProfileDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeviceProfileDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeviceProfileDetailQuery(baseOptions?: Apollo.QueryHookOptions<GetDeviceProfileDetailQuery, GetDeviceProfileDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeviceProfileDetailQuery, GetDeviceProfileDetailQueryVariables>(GetDeviceProfileDetailDocument, options);
      }
export function useGetDeviceProfileDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeviceProfileDetailQuery, GetDeviceProfileDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeviceProfileDetailQuery, GetDeviceProfileDetailQueryVariables>(GetDeviceProfileDetailDocument, options);
        }
export type GetDeviceProfileDetailQueryHookResult = ReturnType<typeof useGetDeviceProfileDetailQuery>;
export type GetDeviceProfileDetailLazyQueryHookResult = ReturnType<typeof useGetDeviceProfileDetailLazyQuery>;
export type GetDeviceProfileDetailQueryResult = Apollo.QueryResult<GetDeviceProfileDetailQuery, GetDeviceProfileDetailQueryVariables>;
export const GetDevicesDocument = gql`
    query getDevices {
  devices {
    deviceProfileId
    deviceSerial
    id
    keyAndCerts
    token
  }
}
    `;

/**
 * __useGetDevicesQuery__
 *
 * To run a query within a React component, call `useGetDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDevicesQuery(baseOptions?: Apollo.QueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
      }
export function useGetDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
        }
export type GetDevicesQueryHookResult = ReturnType<typeof useGetDevicesQuery>;
export type GetDevicesLazyQueryHookResult = ReturnType<typeof useGetDevicesLazyQuery>;
export type GetDevicesQueryResult = Apollo.QueryResult<GetDevicesQuery, GetDevicesQueryVariables>;
export const GetGroupsDocument = gql`
    query getGroups {
  groups {
    area
    creatorId
    endDate
    id
    location
    name
    projectId
    startDate
    type
  }
}
    `;

/**
 * __useGetGroupsQuery__
 *
 * To run a query within a React component, call `useGetGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument, options);
      }
export function useGetGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupsQuery, GetGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupsQuery, GetGroupsQueryVariables>(GetGroupsDocument, options);
        }
export type GetGroupsQueryHookResult = ReturnType<typeof useGetGroupsQuery>;
export type GetGroupsLazyQueryHookResult = ReturnType<typeof useGetGroupsLazyQuery>;
export type GetGroupsQueryResult = Apollo.QueryResult<GetGroupsQuery, GetGroupsQueryVariables>;
export const GetProfileDocument = gql`
    query getProfile {
  getProfile {
    email
    id
    password
    phone
    role
    projects {
      area
      creatorId
      endDate
      id
      latitude
      location
      longitude
      name
      projectType
      startDate
    }
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, options);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const GetProjectsDocument = gql`
    query getProjects {
  projects {
    area
    creatorId
    endDate
    id
    latitude
    location
    longitude
    name
    projectType
    startDate
    imageUrl
    groups {
      area
      creatorId
      endDate
      id
      location
      name
      projectId
      imageUrl
      startDate
      devices {
        deviceProfileId
        deviceSerial
        id
        keyAndCerts
        status
        token
      }
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetUserDevicesDocument = gql`
    query getUserDevices {
  userDevices {
    deviceId
    deviceProfileId
    groupId
    name
    id
    projectId
    userId
  }
}
    `;

/**
 * __useGetUserDevicesQuery__
 *
 * To run a query within a React component, call `useGetUserDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDevicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserDevicesQuery(baseOptions?: Apollo.QueryHookOptions<GetUserDevicesQuery, GetUserDevicesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDevicesQuery, GetUserDevicesQueryVariables>(GetUserDevicesDocument, options);
      }
export function useGetUserDevicesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDevicesQuery, GetUserDevicesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDevicesQuery, GetUserDevicesQueryVariables>(GetUserDevicesDocument, options);
        }
export type GetUserDevicesQueryHookResult = ReturnType<typeof useGetUserDevicesQuery>;
export type GetUserDevicesLazyQueryHookResult = ReturnType<typeof useGetUserDevicesLazyQuery>;
export type GetUserDevicesQueryResult = Apollo.QueryResult<GetUserDevicesQuery, GetUserDevicesQueryVariables>;