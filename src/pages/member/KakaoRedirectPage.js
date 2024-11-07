import { useEffect } from "react";
import { useSearchParams } from"react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { login } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import useCutomLogin from "../../hooks/useCustomLogin"

const KakaoRedirectPage = () =>{

  const [searchParams] = useSearchParams()

  const {moveToPath} = useCutomLogin()

  const authCode = searchParams.get("code")

  const dispatch = useDispatch(); 

  useEffect(() =>{
    getAccessToken(authCode).then(accessToken=>{

        getMemberWithAccessToken(accessToken).then(result => {
          console.log("----------------")
          console.log(result) 
          dispatch(login(result))

          if(result && result.social){
            moveToPath("/member/modify")
          }else{
            moveToPath("/")
          }
          
        })
      })
    }, [authCode])

    return(

    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>

    )
  }
export default KakaoRedirectPage;