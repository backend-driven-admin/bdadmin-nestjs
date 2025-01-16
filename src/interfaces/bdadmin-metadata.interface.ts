/**
 * Represents standard HTTP method types.
 * These methods are used to define REST API endpoints.
 */
export type BdAdminMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Defines the structure for a REST-API endpoint.
 */
export interface BdAdminEndpointType {
	/** The URL path to the REST-API route. */
	url: string;
	/** The HTTP method used for the REST-API route. */
	method: BdAdminMethodType;
}

/**
 * Base types for BDADMIN fields, which influence the type of UI component generated.
 */
export type BdAdminFieldBaseType =
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
 * Options for configuring a BDADMIN Logout handler.
 * This handler defines how logout operations are processed in the application.
 */
export interface BdAdminLogoutOptions {
	/** Endpoint information for logout operations. */
	endpoint: BdAdminEndpointType;
}

/**
 * Configuration options for BDADMIN authentication.
 * Defines the access and refresh token keys used in authentication flows.
 */
export interface BdAdminAuthOptions {
	/** The key for the access token in the response payload. */
	accessKey: string;
	/** The key for the refresh token in the response payload. */
	refreshKey: string;
}

/**
 * Options for configuring a BDADMIN Login handler.
 * Extends logout options by specifying additional details about the data type.
 */
export interface BdAdminLoginOptions extends BdAdminLogoutOptions {
	/** The input or output data type(s) associated with this login handler. */
	type: Function | [Function];
}

/**
 * Options for configuring a BDADMIN Refresh handler.
 * Extends logout options to handle token refresh operations.
 */
export interface BdAdminRefreshOptions extends BdAdminLogoutOptions {
	// No additional fields are required for now, but it uses the same structure as logout options.
}

/**
 * Options for configuring a BDADMIN Entity.
 * An entity represents a resource that can be managed or used in administrative tools.
 */
export interface BdAdminEntityOptions {
	/** A unique name identifying the entity. */
	name: string;
}

/**
 * Options for configuring a BDADMIN DTO behavior.
 * Defines the endpoint and data type for specific operations such as CRUD actions.
 */
export interface BdAdminBehaviorOptions {
	/** The input or output data type(s) associated with this behavior. */
	type: Function | [Function];
	/** The API endpoint configuration for the behavior. */
	endpoint: BdAdminEndpointType;
}

/**
 * Defines the data source for a BDADMIN field.
 * Fields can fetch data from an API or use static local data.
 */
export interface BdAdminDataSource {
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
 * Options for configuring validation on a BDADMIN field.
 * Provides rules for ensuring data integrity and formatting.
 */
export interface BdAdminValidationOptions {
	/** The base type of the field, which influences the UI component type. */
	type: BdAdminFieldBaseType;
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
	dataSource?: BdAdminDataSource;
}

/**
 * Options for configuring a BDADMIN field.
 * Fields represent individual properties of entities that can be displayed or edited.
 */
export interface BdAdminFieldOptions {
	/** The base type of the field, which influences the UI component type. */
	type: BdAdminFieldBaseType;
	/** Whether sorting should be enabled for this field. */
	sort?: boolean;
	/** Whether search functionality should be enabled for this field. */
	search?: boolean;
}

/** Metadata key for BDADMIN BEHAVIOR configuration. */
export const BDADMIN_BEHAVIOR_METADATA = "BDADMIN_BEHAVIOR_METADATA";
/** Metadata key for BDADMIN Entity configuration. */
export const BDADMIN_ENTITY_METADATA = "BDADMIN_ENTITY_METADATA";
/** Metadata key for BDADMIN Validation configuration. */
export const BDADMIN_VALIDATIONS_METADATA = "BDADMIN_VALIDATIONS_METADATA";
/** Metadata key for BDADMIN Fields configuration. */
export const BDADMIN_FIELDS_METADATA = "BDADMIN_FIELDS_METADATA";
/** Metadata key for BDADMIN Login configuration. */
export const BDADMIN_LOGIN_METADATA = "BDADMIN_LOGIN_METADATA";
/** Metadata key for BDADMIN Logout configuration. */
export const BDADMIN_LOGOUT_METADATA = "BDADMIN_LOGOUT_METADATA";
/** Metadata key for BDADMIN Refresh configuration. */
export const BDADMIN_REFRESH_METADATA = "BDADMIN_REFRESH_METADATA";
/** Metadata key for BDADMIN AUTH configuration. */
export const BDADMIN_AUTH_METADATA = "BDADMIN_AUTH_METADATA";
