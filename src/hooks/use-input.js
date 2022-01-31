import { useReducer } from "react";

const initialInputState = {
	value: "",
	isTouched: false,
};

const inputReducer = (state, action) => {
	if (action.type === "INPUT") return { value: action.value, isTouched: state.isTouched };

	if (action.type === "BLUR") return { value: state.value, isTouched: true };

	return initialInputState;
};

const useInput = (validateInput) => {
	const [inputState, dispatchInput] = useReducer(
		inputReducer,
		initialInputState
	);

	const isValidValue = validateInput(inputState.value);

	const hasError = !isValidValue && inputState.isTouched;

	const valueChangeHandler = (event) => {
		dispatchInput({ type: "INPUT", value: event.target.value });
	};

	const inputBlurHandler = () => {
		dispatchInput({ type: "BLUR" });
	};

	return {
		value: inputState.value,
		isValid: isValidValue,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
	};
};

export default useInput;
