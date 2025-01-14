/**
 * Represents the possible actions for a BDAG DTO.
 * These actions are typically associated with creating, editing, or deleting resources.
 */
export type BdagDtoActionType = "create" | "edit" | "delete";

/**
 * Represents standard HTTP method types.
 * These methods are used to define REST API endpoints.
 */
export type BdagMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Defines the structure for a REST-API endpoint.
 */
export interface BdagEndpointType {
	/** The URL path to the REST-API route. */
	url: string;
	/** The HTTP method used for the REST-API route. */
	method: BdagMethodType;
}

/**
 * Base types for BDAG fields, which influence the type of UI component generated.
 */
export type BdagFieldBaseType =
	| "string"
	| "hidden"
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
 * Options for configuring a BDAG Logout handler.
 * This handler defines how logout operations are processed in the application.
 */
export interface BdagLogoutOptions {
	/** Endpoint information for logout operations. */
	endpoint: BdagEndpointType;
}

/**
 * Configuration options for BDAG authentication.
 * Defines the access and refresh token keys used in authentication flows.
 */
export interface BdagAuthOptions {
	/** The key for the access token in the response payload. */
	accessKey: string;
	/** The key for the refresh token in the response payload. */
	refreshKey: string;
}

/**
 * Options for configuring a BDAG Login handler.
 * Extends logout options by specifying additional details about the data type.
 */
export interface BdagLoginOptions extends BdagLogoutOptions {
	/** The input or output data type(s) associated with this login handler. */
	type: Function | [Function];
}

/**
 * Options for configuring a BDAG Refresh handler.
 * Extends logout options to handle token refresh operations.
 */
export interface BdagRefreshOptions extends BdagLogoutOptions {
	// No additional fields are required for now, but it uses the same structure as logout options.
}

/**
 * Options for configuring a BDAG Entity.
 * An entity represents a resource that can be managed or used in administrative tools.
 */
export interface BdagEntityOptions {
	/** A unique name identifying the entity. */
	name: string;
}

/**
 * Options for configuring a BDAG DTO behavior.
 * Defines the endpoint and data type for specific operations such as CRUD actions.
 */
export interface BdagBehaviorOptions {
	/** The input or output data type(s) associated with this behavior. */
	type: Function | [Function];
	/** The API endpoint configuration for the behavior. */
	endpoint: BdagEndpointType;
}

/**
 * Defines the data source for a BDAG field.
 * Fields can fetch data from an API or use static local data.
 */
export interface BdagDataSource {
	/** Indicates the type of data source: API-based or local data. */
	type: "api" | "local";
	/** API configuration for fetching data. */
	api?: {
		/** The key of the entity to fetch data for. */
		entityKey: string;
		/** Fields to include in the API response. */
		fields: Array<string>;
	};
	/** Local data for static options. */
	local?: Array<any>;
}

/**
 * Options for configuring validation on a BDAG field.
 * Provides rules for ensuring data integrity and formatting.
 */
export interface BdagValidationOptions {
	/** The base type of the field, which influences the UI component type. */
	type: BdagFieldBaseType;
	/** Minimum length for a string or minimum value for a number. */
	min?: number;
	/** Maximum length for a string or maximum value for a number. */
	max?: number;
	/** Indicates whether the field is required. */
	required?: boolean;
	/** Indicates whether the field must be unique. */
	unique?: boolean;
	/** Whether to hide the field in the UI. */
	hidden?: boolean;
	/** Makes the field read-only when set to true. */
	disabled?: boolean;
	/** Default value for the field. */
	defaultValue?: any;
	/** Regular expression or string pattern for validating string fields. */
	regex?: RegExp | string;
	/** Data source for fields like dropdowns where selections come from a dataset. */
	dataSource?: BdagDataSource;
}

/**
 * Options for configuring a BDAG field.
 * Fields represent individual properties of entities that can be displayed or edited.
 */
export interface BdagFieldOptions {
	/** The base type of the field, which influences the UI component type. */
	type: BdagFieldBaseType;
	/** Whether sorting should be enabled for this field. */
	sort?: boolean;
	/** Whether search functionality should be enabled for this field. */
	search?: boolean;
}

/** Metadata key for BDAG BEHAVIOR configuration. */
export const BDAG_BEHAVIOR_METADATA = "BDAG_BEHAVIOR_METADATA";
/** Metadata key for BDAG Entity configuration. */
export const BDAG_ENTITY_METADATA = "BDAG_ENTITY_METADATA";
/** Metadata key for BDAG Validation configuration. */
export const BDAG_VALIDATIONS_METADATA = "BDAG_VALIDATIONS_METADATA";
/** Metadata key for BDAG Fields configuration. */
export const BDAG_FIELDS_METADATA = "BDAG_FIELDS_METADATA";
/** Metadata key for BDAG Login configuration. */
export const BDAG_LOGIN_METADATA = "BDAG_LOGIN_METADATA";
/** Metadata key for BDAG Logout configuration. */
export const BDAG_LOGOUT_METADATA = "BDAG_LOGOUT_METADATA";
/** Metadata key for BDAG Refresh configuration. */
export const BDAG_REFRESH_METADATA = "BDAG_REFRESH_METADATA";
/** Metadata key for BDAG AUTH configuration. */
export const BDAG_AUTH_METADATA = "BDAG_AUTH_METADATA";
