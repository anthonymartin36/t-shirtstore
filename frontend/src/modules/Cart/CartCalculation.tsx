interface CartCalculationProps {
    total: number
}

const CartCalculation: React.FC<CartCalculationProps>= ({ total }) => {
    let total2: number= Number(total)
    total2 = Number(total2.toFixed(2))
    let gst: number = total2 * 0.15
    gst = Number(gst.toFixed(2))
    const shipping: number = 5.60
    let result: number = total2 + shipping + gst
    result = Number(result.toFixed(2))

    return (
        <div>
        <div className="flex justify-between mt-4">
            <div className="text-left"> GST (%15)</div>
            <div  className="text-right">
                $ { gst }
            </div>
        </div>
        <div  className="flex justify-between mt-4">
            <div className="text-left">Shipping</div>
            <div className="text-right"> $ {shipping.toFixed(2)}</div>
        </div>
        <div className="flex justify-between mt-4 font-bold">
            <div className="text-left hidden b">{total2}</div>
            <div className="text-left"> Total </div>
            <div  className="text-right">
                $ { result }
            </div>
        </div>
        <div className="flex justify-between text-right font-medium text-gray-900">
        </div>
        </div>
	)
}

export default CartCalculation
