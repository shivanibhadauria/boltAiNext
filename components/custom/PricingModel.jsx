import Lookup from '@/app/data/Lookup'
import React , {useState} from 'react'
import {PayPalButtons} from '@paypal/react-paypal-js'
import { useContext } from'react';
import { UserContext } from '@/context/UserContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { UpdateTokens } from '@/convex/users';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


const PricingModel = () => {
    const {userDetail, setUserDetail} = useContext(UserContext);
    const [selectedOption, setSelectedOption] = useState();
 
    const updateToken = useMutation(api.users.UpdateTokens);



    const onPayementSuccess = async () => {
        const token = userDetail?.token + Number(selectedOption?.tokens);
        console.log(token)
        await updateToken({
            userId: userDetail?._id,
            token: token,
        })

    }

  return (
    <PayPalScriptProvider options={{ "client-id": process.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'  >
        {Lookup.PRICING_OPTIONS.map((pricing, index) => {
         
          return (
            <div key={index} className=' border p-7 rounded-xl  flex flex-col gap-3   '  >
                <h2 className='font-bold text-2xl' >{pricing.name}</h2>
                <h2 className='font-medium text-lg '>{pricing.tokens} Tokens </h2>
                <p className='text-gray-400' >{pricing.desc}</p>
                <h2 className='font-bold text-4xl text-center mt-6' >{pricing.price}</h2>
              {/* <Button >Upgrade to {pricing.name}</Button> */}
              <PayPalButtons style={{ layout: "horizontal" }} 
              disabled={!userDetail}
              onClick={()=> {setSelectedOption(pricing.value);console.log(pricing.value)}}
              onApprove={() =>onPayementSuccess()}
              onCancel={() => console.log("payment cancelled")}
              
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: pricing.price,
                        currency_code: "USD",
                      },
                    },
                  ],
                });
              }}
              />
                
              
            </div>
          )
          
        })}
    </div></PayPalScriptProvider>
  )
}

export default PricingModel