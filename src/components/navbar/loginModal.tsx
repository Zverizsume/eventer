import { loginWithGoogle, registerWithPassword } from "@/actions";
import { loginWithPassword } from "@/actions/login";
import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { useFormState } from "react-dom";

export default function LoginModal() {

    const { isOpen : isLoginMidalOpen, onOpen : onLoginModalOpen, onClose : onLoginModalClose } = useDisclosure();

    const { isOpen : isRegisterModalOpen, onOpen: onRegisterModalOpen, onClose : onRegisterModalClose } = useDisclosure();

    const [ loginFormState, loginFormAction ] = useFormState(loginWithPassword, {
        errors: {}
    })

    const [ registerFormState, registerFormAction ] = useFormState(registerWithPassword, {
        errors: {}
    })

    const switchModal = () => {

        if( isLoginMidalOpen ) {
            onLoginModalClose()
            onRegisterModalOpen()
        }
        else {
            onRegisterModalClose()
            onLoginModalOpen()
        }

    }

        return(

            <>
                <Button
                    onPress={onLoginModalOpen}
                >
                    Login
                </Button>
                <Modal backdrop={'blur'} isOpen={isLoginMidalOpen} onClose={onLoginModalClose}>
                    <ModalContent className="pb-3">
                        <ModalHeader>
                            Login
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4 items-center justify-center w-full">
                                <form action={loginFormAction} className="flex flex-col gap-2 w-full">
                                    <Input name={'email'} type='email' label={'Email'} placeholder="Enter email" />
                                    {
                                        loginFormState.errors && loginFormState.errors.email ?
                                            <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{loginFormState.errors.email}</p>
                                        : null
                                    }
                                    <Input name={'password'} type='password' label={'Password'} placeholder="Enter password" />
                                    {
                                        loginFormState.errors && loginFormState.errors.password ?
                                            <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{loginFormState.errors.password}</p>
                                        : null
                                    }
                                    <Button type="submit">Login</Button>
                                    {
                                        loginFormState.errors && loginFormState.errors._form ?
                                            <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{loginFormState.errors._form}</p>
                                        : null
                                    }
                                </form>
                                <div className="text-center">
                                    <p>{`Don't have an acc,`} <Button size={'sm'} className="p-1" onPress={switchModal}>Register</Button></p>
                                    <p>or</p>
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={() => loginWithGoogle()}
                                    startContent={<Image src={'./icons/google.png'} width={'30px'} />}
                                >
                                    With Google
                                </Button>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>

                <Modal backdrop={'blur'} isOpen={isRegisterModalOpen} onClose={onRegisterModalClose}>
                    <ModalContent className="pb-3">
                        <ModalHeader>
                            Register
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4 items-center justify-center w-full">
                                <form action={registerFormAction} className="flex flex-col gap-2 w-full">
                                    <Input name={'email'} type='email' label={'Email'} placeholder="Enter email" />
                                    {
                                        registerFormState.errors && registerFormState.errors.email ?
                                            <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{registerFormState.errors.email}</p>
                                        : null
                                    }
                                    <Input name={'password'} type='password' label={'Password'} placeholder="Enter password" />
                                    {
                                        registerFormState.errors && registerFormState.errors.password ?
                                            <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{registerFormState.errors.password}</p>
                                        : null
                                    }
                                    <Input name={'full_name'} type={'text'} label={'Full name'} placeholder="Enter full name" />
                                    <div className="flex flex-row gap-2">
                                        <Input name={'birth_day'} type={'number'} label={'Day'} min={1} max={31} />
                                        <Input name={'birth_month'} type={'number'} label={'Month'} min={1} max={12} />
                                        <Input name={'birth_year'} type={'number'} label={'Year'} min={1945} max={dayjs().year()} />
                                    </div>
                                    <Button type="submit">Register</Button>
                                    {
                                        registerFormState.errors && registerFormState.errors._form ?
                                            <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{registerFormState.errors._form}</p>
                                        : null
                                    }
                                </form>
                                <div className="text-center">
                                    <p>{`Already have an acc,`} <Button size={'sm'} className="p-1" onPress={switchModal}>Login</Button></p>
                                    <p>or</p>
                                </div>
                                <Button
                                    className="w-full"
                                    onClick={() => loginWithGoogle()}
                                    startContent={<Image src={'./icons/google.png'} width={'30px'} />}
                                >
                                    With Google
                                </Button>
                            </div>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        )

}