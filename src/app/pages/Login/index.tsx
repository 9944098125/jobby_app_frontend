import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginForm from './components/form';
import { useGlobalSlice } from 'app/slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'app/components/ui/use-toast';
import { useDispatch } from 'react-redux';

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { useLoginMutation, actions } = useGlobalSlice();

  const [
    triggerLogin,
    {
      isLoading: loggingIn,
      data: loginData,
      isSuccess: loggedIn,
      isError: errorLoggingIn,
      error: loginErrorMessage,
    },
  ] = useLoginMutation();

  const [showPassword, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    if (loggedIn) {
      dispatch(actions.setUser(loginData?.user));
      dispatch(actions.setToken(loginData?.token));
      navigate('/', { replace: true });
      toast({
        description: 'Logged In Successfully',
        variant: 'success',
      });
    }
  }, [
    loggedIn,
    navigate,
    dispatch,
    actions,
    loginData?.user,
    loginData?.token,
  ]);

  React.useEffect(() => {
    if (loginErrorMessage || errorLoggingIn) {
      toast({
        description:
          loginErrorMessage?.[0] || 'Something went wrong while login',
        variant: 'destructive',
      });
    }
  }, [loginErrorMessage, errorLoggingIn]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <div className="w-full min-h-screen grid grid-cols-12">
        <div className="col-span-2 bg-gradient-to-tr from-teal-800 via-teal-500 to-cyan-700 h-screen"></div>
        <div className="col-span-10 md:col-span-8 bg-gradient-to-bl from-pink-800 via-pink-500 to-red-700 h-screen flex items-center px-5">
          <div className="w-full md:w-2/3">
            <LoginForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              trigger={triggerLogin}
              isLoading={loggingIn}
            />
          </div>
        </div>
        <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-yellow-500 via-yellow-300 to-orange-400 h-screen"></div>
      </div>
    </React.Fragment>
  );
}
