 export async function MapComplimentsReceiver(rating: [any]) {
    const compliments = await rating.map((item)=>{
        return  {
         user:{
            user_id:item.userReceiver.id,
            user_name:item.userReceiver.name
          },   
          message:{
            message_id:item.id,
            message_text:item.message,
            created_at:item.created_at,
            tag_name:{
                tag_name:item.tag.name,
                tag_id:item.tag.id
              },
          },
          user_sender:{
              user_sender_id:item.userSender.id,
              user_sender_name:item.userSender.name
          },
        }
    });
    return compliments;
 }

 export async function MapComplimentsReceiverComplete(rating: [any]) {
  const compliments = await rating.map((item)=>{
      return  {  
        message:{
          message_id:item.id,
          message_text:item.message,
          created_at:item.created_at,
          tag_name:{
              tag_name:item.tag.name,
              tag_id:item.tag.id
            },
        },
        user_sender:{
          user_sender_id:item.userSender.id,
          user_sender_name:item.userSender.name,
          user_sender_created_at: item.userSender.created_at
        },
        user_receiver:{
          user_receiver_id:item.userReceiver.id,
          user_receiver_name:item.userReceiver.name,
          user_receiver_created_at: item.userReceiver.created_at
        },
      }
  });
  return compliments;
}

export async function MapComplimentsReceiverFilterAdm(rating) {
  const compliments = await {
      message: {
        message_id: rating.id,
        message_text: rating.message,
        created_at: rating.created_at,
        tag_name: {
          tag_name: rating.tag.name,
          tag_id: rating.tag.id
        },
      },
      user_sender: {
        user_sender_id: rating.userSender.id,
        user_sender_name: rating.userSender.name,
        user_sender_created_at: rating.userSender.created_at
      },
      user_receiver: {
        user_receiver_id: rating.userReceiver.id,
        user_receiver_name: rating.userReceiver.name,
        user_receiver_created_at: rating.userReceiver.created_at
      },
    }
  return compliments;
}

export async function MapComplimentsReceiverFilterNotAdm(rating) {
    const compliments = await {   
          message:{
            message_id:rating.id,
            message_text:rating.message,
            created_at:rating.created_at,
            tag_name:{
                tag_name:rating.tag.name,
                tag_id:rating.tag.id
              },
          },
          user_sender:{
              user_sender_id:rating.userSender.id,
              user_sender_name:rating.userSender.name
          },
        }
    return compliments;
}

export async function MapComplimentsSender(rating) {
    const compliments = await rating.map((item)=>{
        return  {
         user:{
            user_id:item.userSender.id,
            user_name:item.userSender.name
          },  
          message:{
            message_id:item.id,
            message_text:item.message,
            created_at:item.created_at,
            tag:{
                tag_name:item.tag.name,
                tag_id:item.tag.id
              },
          },
          user_receiver:{
              user_receiver_id:item.userReceiver.id,
              user_receiver_name:item.userReceiver.name
          }
        }
    });
    return compliments;
}