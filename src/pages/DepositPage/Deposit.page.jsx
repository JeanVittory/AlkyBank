import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "src/components/Button";
import { MovementFormToCreate } from "src/adapters/MovementFormToCreate.adapter"; 

export default function DepositPage() {
	const [currency, setCurrency] = useState("")
	const [amount, setAmount] = useState(null)
	const [otherAmount, setOtherAmount] = useState(null)
	const [otherAmountInvalid, setOtherAmountInvalid] = useState("")
	const [message, setMessage] = useState("")
	const [showOtherForm, setShowOtherForm] = useState(false)
	
	const accessToken = localStorage.getItem("ACCESS_TOKEN")
	const notify = (text, type) => toast(text, { autoClose: 3000, type: type, theme: "light"})
	
	const handleForm = (event) => {
		event.preventDefault()

		if(currency && amount && message){
			const movementWithCurrency = {
				type: "topup",
				concept: message,
				currencyCode: currency,
				isTransference: false,
				amount: amount
			}

			const endPointBody = MovementFormToCreate(movementWithCurrency)
			
			createDeposit(319, endPointBody)
		}else{
			notify("Please fill all fields out", "error")
		}
	}

	const handleOtherForm = () => {
		setShowOtherForm(previous => !previous)
	}

	const handleMessage = (event) => {
		setMessage(event.target.value)
	}

	const handleQuantity = (quantity) => {
		setAmount(quantity)
	}

	const handleOtherQuantity = (event) => {
		setOtherAmount(event.target.value)
	}

	const closeOtherForm = () => setShowOtherForm(false)

	const handleOtherQuantityForm = (event) => {
		event.preventDefault()

		if(otherAmount <= 0){
			setOtherAmountInvalid(true)
		}else{
			setAmount(otherAmount)
			setOtherAmountInvalid(false)
			closeOtherForm()
		}
	}

	const createDeposit = async (id, object) => {
		try{
			const response = await fetch(`http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${id}`, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${accessToken}`,
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify(object)
			})
	
			const data = await response.json()
	
			if(data.status === 200){
				setCurrency("")
				setAmount(null)
				setOtherAmount(null)
				setMessage("")

				console.log(data)
				notify("Deposit made successfully", "success")
			}else{
				notify("Something went wrong", "error")
			}
		}catch{
			console.log()
		}
	}

	return (
		<>
			<div className="w-screen min-h-screen flex justify-center items-center">
				<form onSubmit={handleForm} className="flex flex-col min-w-[350px] gap-8">
					<div className="flex justify-between">
						<h1 className="text-4xl">Deposit</h1>
						<h1 className="text-sm">{new Date().toLocaleDateString()}</h1>
					</div>
					<div className="flex flex-col gap-4">
						<span>Select a currency</span>
						<div className="flex gap-4">
							<Button variant={currency === "ARS" ? "primary" : "tertiary"} onClick={() => setCurrency("ARS")}>ARS</Button>
							<Button variant={currency === "USD" ? "primary" : "tertiary"} onClick={() => setCurrency("USD")}>USD</Button>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<span>How much will you deposit?</span>
						<div className="grid grid-cols-4 gap-4">
							<Button variant={amount && amount === 100 ? "primary" : "tertiary"} onClick={() => handleQuantity(100)}>100</Button>
							<Button variant={amount && amount === 200 ? "primary" : "tertiary"} onClick={() => handleQuantity(200)}>200</Button>
							<Button variant={amount && amount === 300 ? "primary" : "tertiary"} onClick={() => handleQuantity(300)}>300</Button>
							<Button variant={amount && amount === 400 ? "primary" : "tertiary"} onClick={() => handleQuantity(400)}>400</Button>
							<Button variant={amount && amount === 500 ? "primary" : "tertiary"} onClick={() => handleQuantity(500)}>500</Button>
							<Button variant={amount && amount === 1000 ? "primary" : "tertiary"} onClick={() => handleQuantity(1000)}>1000</Button>
							<Button variant={amount && amount === 1500 ? "primary" : "tertiary"} onClick={() => handleQuantity(1500)}>1500</Button>
							<Button variant={amount && amount === otherAmount ? "primary" : "tertiary"} onClick={handleOtherForm}>Other</Button>
						</div>
					</div>
					<div className="flex flex-col gap-4">
						<span>Message</span>
						<input type="text" onChange={handleMessage} value={message} className="border border-black rounded-md py-1 px-2"/>
					</div>
					<Button type="submit" variant="primary">Deposit</Button>
				</form>
			</div>

			{
				showOtherForm && <>
					<div className="fixed top-0 left-0 min-h-screen w-full flex justify-center items-center bg-black bg-opacity-50">
						<form onSubmit={handleOtherQuantityForm} className="flex flex-col gap-4 min-w-[350px] bg-white p-4 rounded-lg">
							<div className="flex justify-between items-center">
								<h1>Specify an amount</h1>
								<button type="button" onClick={closeOtherForm}>X</button>
							</div>
							<input type="number" onChange={handleOtherQuantity} className="border border-black rounded-md py-1 px-2"/>
							{ otherAmountInvalid && <span>Please specify an amount to continue.</span>}
							<Button type="submit" variant="primary">Done</Button>
						</form>
					</div>
				</>
			}
		</>
	)
}
