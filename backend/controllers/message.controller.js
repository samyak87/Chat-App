export const sendMessage = async(req,res) =>{
   try {
    const {id} = req.params;
    const {message} = req.body;

    res.status(200).json({message:"Message sent"});
    
   } catch (error) {
    res.status(500).json({message:error.message});
   }
}

