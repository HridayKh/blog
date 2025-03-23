export class Blog {
	constructor({
		id = "",
		title = "",
		subtitle = "",
		tagline = "",
		content = "",
		tags = [],
		date = new Date().toISOString(),
		archived = false,
	} = {}) {
		this._id = id;
		this._title = title;
		this._subtitle = subtitle;
		this._tagline = tagline;
		this._content = content;
		this._tags = tags;
		this._date = date;
		this._archived = archived;
	}

	// Common getter and setter generator for all properties
	get id() {
		return this._id;
	}
	set id(value) {
		this._validateNonEmpty(value, "id");
		this._id = value;
	}

	get title() {
		return this._title;
	}
	set title(value) {
		this._validateNonEmpty(value, "title");
		this._title = value;
	}

	get subtitle() {
		return this._subtitle;
	}
	set subtitle(value) {
		this._subtitle = value;
	}

	get tagline() {
		return this._tagline;
	}
	set tagline(value) {
		this._tagline = value;
	}

	get content() {
		return this._content;
	}
	set content(value) {
		this._content = value;
	}

	get tags() {
		return this._tags;
	}
	set tags(value) {
		if (!Array.isArray(value)) {
			throw new Error("Tags must be an array");
		}
		this._tags = value;
	}

	get date() {
		return this._date;
	}
	set date(value) {
		this._date = value;
	}

	get archived() {
		return this._archived;
	}
	set archived(value) {
		this._archived = Boolean(value); // Ensures it's always a boolean
	}

	// Helper method for validation
	_validateNonEmpty(value, fieldName) {
		if (!value) {
			throw new Error(`${fieldName} cannot be empty`);
		}
	}
}

export class Tag {
	constructor({ id = "", name = "", hex = "#000000" } = {}) {
		this._id = id;
		this._name = name;
		this._hex = hex;
	}

	// Getter and Setter for id
	get id() {
		return this._id;
	}
	set id(value) {
		this._validateNonEmpty(value, "id");
		this._id = value;
	}

	// Getter and Setter for name
	get name() {
		return this._name;
	}
	set name(value) {
		this._validateNonEmpty(value, "name");
		this._name = value;
	}

	// Getter and Setter for hex
	get hex() {
		return this._hex;
	}
	set hex(value) {
		if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
			throw new Error("Hex must be a valid 6-character color code (e.g., #FFFFFF)");
		}
		this._hex = value;
	}

	// Validation helper
	_validateNonEmpty(value, fieldName) {
		if (!value) {
			throw new Error(`${fieldName} cannot be empty`);
		}
	}
}

export class Image {
	constructor({ id = "", name = "", alt = "" } = {}) {
		this._id = id;
		this._name = name;
		this._alt = alt;
	}

	// Getter and Setter for id
	get id() {
		return this._id;
	}
	set id(value) {
		this._validateNonEmpty(value, "id");
		this._id = value;
	}

	// Getter and Setter for name
	get name() {
		return this._name;
	}
	set name(value) {
		this._validateNonEmpty(value, "name");
		this._name = value;
	}

	// Getter and Setter for alt
	get alt() {
		return this._alt;
	}
	set alt(value) {
		this._alt = value;
	}

	// Validation helper
	_validateNonEmpty(value, fieldName) {
		if (!value) {
			throw new Error(`${fieldName} cannot be empty`);
		}
	}
}
