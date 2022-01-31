import { useRef } from "react";
import useInput from "../../hooks/use-input";

import classes from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isSixChars = (value) => value.length === 6;

const Checkout = (props) => {
	const {
		value: username,
		isValid: isUsernameValid,
		hasError: usernameHasError,
		valueChangeHandler: usernameChangeHandler,
		inputBlurHandler: usernameBlurHandler,
		// reset: usernameReset,
	} = useInput(isNotEmpty);

	const {
		value: street,
		isValid: isStreetValid,
		hasError: streetHasError,
		valueChangeHandler: streetChangeHandler,
		inputBlurHandler: streetBlurHandler,
		// reset: streetReset,
	} = useInput(isNotEmpty);

	const {
		value: city,
		isValid: isCityValid,
		hasError: cityHasError,
		valueChangeHandler: cityChangeHandler,
		inputBlurHandler: cityBlurHandler,
		// reset: cityReset,
	} = useInput(isNotEmpty);

	const {
		value: postalCode,
		isValid: isPostalCodeValid,
		hasError: postalCodeHasError,
		valueChangeHandler: postalCodeChangeHandler,
		inputBlurHandler: postalCodeBlurHandler,
		// reset: postalCodeReset,
	} = useInput(isSixChars);

	const nameInputRef = useRef();
	const streetInputRef = useRef();
	const postalCodeInputRef = useRef();
	const cityInputRef = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const errorFocus = (input) => {
			input.current.classList.add(classes.invalid);
			input.current.focus();
		};

		let formIsValid = false;

		if (isUsernameValid && isStreetValid && isPostalCodeValid && isCityValid)
			formIsValid = true;

		if (!formIsValid) {
			if (!isCityValid) {
				errorFocus(cityInputRef);
			}
			if (!isPostalCodeValid) {
				errorFocus(postalCodeInputRef);
			}
			if (!isStreetValid) {
				errorFocus(streetInputRef);
			}
			if (!isUsernameValid) {
				errorFocus(nameInputRef);
			}

			return;
		}

		props.onConfirm({
			name: username,
			street: street,
			postalCode: postalCode,
			city: city,
		});
	};

	const nameControlClasses = `${classes.control} ${
		usernameHasError ? classes.invalid : ""
	}`;
	const streetControlClasses = `${classes.control} ${
		streetHasError ? classes.invalid : ""
	}`;
	const postalCodeControlClasses = `${classes.control} ${
		postalCodeHasError ? classes.invalid : ""
	}`;
	const cityControlClasses = `${classes.control} ${
		cityHasError ? classes.invalid : ""
	}`;

	return (
		<form onSubmit={confirmHandler} autoComplete="off">
			<div className={nameControlClasses}>
				<label htmlFor="name">Your Name</label>
				<input
					ref={nameInputRef}
					type="text"
					id="name"
					value={username}
					onChange={usernameChangeHandler}
					onBlur={usernameBlurHandler}
				/>
				{usernameHasError && <p>Please enter a valid Name</p>}
			</div>
			<div className={streetControlClasses}>
				<label htmlFor="street">Street</label>
				<input
					ref={streetInputRef}
					type="text"
					id="street"
					value={street}
					onChange={streetChangeHandler}
					onBlur={streetBlurHandler}
				/>
				{streetHasError && <p>Please enter a valid Street</p>}
			</div>
			<div className={postalCodeControlClasses}>
				<label htmlFor="postal">Postal Code</label>
				<input
					ref={postalCodeInputRef}
					type="text"
					id="postal"
					value={postalCode}
					onChange={postalCodeChangeHandler}
					onBlur={postalCodeBlurHandler}
				/>
				{postalCodeHasError && (
					<p>Please enter a valid postal code (must be 5 letters in length)</p>
				)}
			</div>
			<div className={cityControlClasses}>
				<label htmlFor="city">City</label>
				<input
					ref={cityInputRef}
					type="text"
					id="city"
					value={city}
					onChange={cityChangeHandler}
					onBlur={cityBlurHandler}
				/>
				{cityHasError && <p>Please enter a valid City</p>}
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
