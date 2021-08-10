export async function MapReturnCompliment(rating){
    const mapCompliment = await {
        compliment_id:rating.id,
        user_sender: {
           user_id:rating.userSender.id,
           user_name:rating.userSender.name,
        },
        user_receive:  {
           user_id:rating.userReceiver.id,
           user_name:rating.userReceiver.name,
        },
        tag:  {
           tag_id:rating.tag.id,
           tag_name:rating.tag.name,
        },
        message: rating.message,
        created_at: rating.created_at
    }
   return mapCompliment;
 }