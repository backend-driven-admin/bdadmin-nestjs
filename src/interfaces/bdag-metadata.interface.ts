/**
 * Represents the possible actions for a BDAG DTO.
 */
export type BdagDtoActionType = "create" | "edit" | "delete";

/**
 * Represents standard HTTP method types.
 */
export type BdagMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Defines the structure for a REST-API endpoint.
 */
export interface BdagEndpointType {
	/** The URL path to the REST-API route */
	url: string;
	/** The HTTP method used for the REST-API route */
	method: BdagMethodType;
}

/**
 * Base types for BDAG fields, which influence the UI component type.
 */
export type BdagFieldBaseType =
	| "string"
	| "number"
	| "boolean"
	| "date"
	| "array"
	| "object"
	| "audio"
	| "video"
	| "image"
	| "token";

/**
 * Options for configuring a BDAG DTO.
 */
export interface BdagDtoOptions {
	/**
	 * Action configuration for the DTO, including type and associated endpoint.
	 * - `type`: Specifies the type of DTO action (create, edit, delete).
	 * - `endpoint`: Details of the REST-API route associated with this action.
	 */
	action: {
		type: BdagDtoActionType;
		endpoint: BdagEndpointType;
	};
	/** The key that links this DTO to a specific entity */
	entityKey: string;
	/** Optional array of roles required to access this DTO */
	roles?: string[];
}

/**
 * Options for configuring a BDAG Logout handler.
 */
export interface BdagLogoutOptions {
	/** Endpoint information for logout operations */
	endpoint: BdagEndpointType;
}

/**
 * Options for configuring a BDAG Login handler.
 * Extends logout options by specifying response tokens.
 */
export interface BdagLoginOptions extends BdagLogoutOptions {
	/**
	 * Response configuration indicating the keys for access and refresh tokens.
	 */
	response: {
		accessKey: string;
		refreshKey: string;
	};
}

/**
 * Options for configuring a BDAG Refresh handler.
 * Extends logout options by specifying response token.
 */
export interface BdagRefreshOptions extends BdagLogoutOptions {
	/**
	 * Response configuration indicating the key for the refresh token.
	 */
	response: {
		refreshKey: string;
	};
}

/**
 * Options for configuring a BDAG Entity.
 */
export interface BdagEntityOptions {
	/** Unique key identifying the entity */
	key: string;
	/** Endpoint information associated with this entity */
	endpoint: BdagEndpointType;
	/** Optional array of roles required to access this entity */
	roles?: string[];
}

/**
 * Defines the data source for a BDAG field.
 * It can either be local data or fetched via an API.
 */
export interface BdagDataSource {
	/** Indicates the type of data source: API-based or local data */
	type: "api" | "local";
	/** If using an API, configuration details for fetching entity data */
	api?: {
		/** The key of the entity to fetch data for */
		entityKey: string;
		/**
		 * Fields to include in the API response.
		 * If only one field is provided, an array of values is returned instead of an array of objects.
		 */
		fields: Array<string>;
	};
	/** If using local data, an array of data items */
	local?: Array<any>;
}

/**
 * Options for configuring validation on a BDAG field.
 */
export interface BdagValidationOptions {
	/** The base type of the field, which influences UI component type */
	type: BdagFieldBaseType;
	/** Minimum length for a string or minimum value for a number */
	min?: number;
	/** Maximum length for a string or maximum value for a number */
	max?: number;
	/** Indicates whether the field is required */
	required?: boolean;
	/** Indicates whether the field must be unique */
	unique?: boolean;
	/** Whether to hide the field in the UI */
	hidden?: boolean;
	/** Makes the field read-only when set to true */
	disabled?: boolean;
	/** Default value for the field */
	defaultValue?: any;
	/** Regular expression or string pattern for validating string fields */
	regex?: RegExp | string;
	/**
	 * Data source for dynamic select fields.
	 * Provides options for fields such as dropdowns where selections come from a data set.
	 */
	dataSource?: BdagDataSource;
}

/**
 * Options for configuring a BDAG field.
 */
export interface BdagFieldOptions {
	/** The base type of the field, which influences UI component type */
	type: BdagFieldBaseType;
	/** Whether sorting should be enabled for this field */
	sort?: boolean;
	/** Whether search functionality should be enabled for this field */
	search?: boolean;
}

/** Metadata key for BDAG DTO configuration */
export const BDAG_DTO_METADATA = "BDAG_DTO_METADATA";
/** Metadata key for BDAG Entity configuration */
export const BDAG_ENTITY_METADATA = "BDAG_ENTITY_METADATA";
/** Metadata key for BDAG Validation configuration */
export const BDAG_VALIDATIONS_METADATA = "BDAG_VALIDATIONS_METADATA";
/** Metadata key for BDAG Fields configuration */
export const BDAG_FIELDS_METADATA = "BDAG_FIELDS_METADATA";
/** Metadata key for BDAG Login configuration */
export const BDAG_LOGIN_METADATA = "BDAG_LOGIN_METADATA";
/** Metadata key for BDAG Logout configuration */
export const BDAG_LOGOUT_METADATA = "BDAG_LOGOUT_METADATA";
/** Metadata key for BDAG Refresh configuration */
export const BDAG_REFRESH_METADATA = "BDAG_REFRESH_METADATA";
