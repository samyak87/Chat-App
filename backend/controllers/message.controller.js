import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res) =>{
   try {
    const {id:recieverId} = req.params;
    const {message} = req.body;
    
    const senderId = req.user._id;

    // we used let because it can be changed
   let conversation = await Conversation.findOne(
      {participants:{$all:[senderId,recieverId]}
   })

   // if there is no conversation yet, we need to create
   if(!conversation){
      conversation = await Conversation.create({
         participants:[senderId,recieverId]
      })
   }

   const newMessage = new Message({
      senderId,
      recieverId,
      message
   })

   if(newMessage)
   {
      conversation.messages.push(newMessage._id);
    
   }

   // socket io functionality here




   // await conversation.save();
   // await newMessage.save();

   // this is the same as above but we are using promise.all to make it faster as it runs in parallel
   await Promise.all([conversation.save(), newMessage.save()]);

   res.status(201).json(newMessage);

    
   } catch (error) {
    res.status(500).json({message:error.message});
   }
}


export const getMessages = async(req,res) =>{

   try {
      const {id:userToChatId} = req.params;
      const senderId = req.user._id;

      const conversation = await Conversation.findOne(
         {participants:{$all:[senderId,userToChatId]}}
      ).populate("messages");
  // populate is used to get messages instead of ids of messages
       
      if(!conversation){
         return res.status(200).json([]);
      }
      
        res.status(200).json(conversation.messages);

   } catch (error) {
      console.log("Error in getMessages: ",error.message);
      res.status(500).json({message:error.message});

   }
}
