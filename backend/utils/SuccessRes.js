const SuccessRes = (res, message, data = null) => {
    return res.status(200).json({message, data})
}

export default SuccessRes;