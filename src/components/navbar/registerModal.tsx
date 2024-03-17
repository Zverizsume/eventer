import { loginWithGoogle, registerWithPassword } from "@/actions";
import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import dayjs from "dayjs";
import { useFormState } from "react-dom";

export default function RegisterModal({open} : {open : boolean}) {

    const { isOpen = open, onOpen, onClose } = useDisclosure();

    const [ formState, action ] = useFormState(registerWithPassword, {
        errors: {}
    })

    return(

        <>
            <Button
                onPress={onOpen}
            >
                Register
            </Button>
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
                <ModalContent className="pb-3">
                    <ModalHeader>
                        Register
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4 items-center justify-center w-full">
                            <form action={action} className="flex flex-col gap-2 w-full">
                                <Input name={'email'} type='email' label={'Email'} placeholder="Enter email" />
                                {
                                    formState.errors && formState.errors.email ?
                                        <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{formState.errors.email}</p>
                                    : null
                                }
                                <Input name={'password'} type='password' label={'Password'} placeholder="Enter password" />
                                {
                                    formState.errors && formState.errors.password ?
                                        <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{formState.errors.password}</p>
                                    : null
                                }

                                <Button type="submit">Login</Button>
                                {
                                    formState.errors && formState.errors._form ?
                                        <p className="text-danger-500 bg-danger-200 bg-opacity-20 rounded-lg px-2 py-1">{formState.errors._form}</p>
                                    : null
                                }
                            </form>
                            <div className="text-center">
                                <p>{`Don't have an acc,`} <Button size={'sm'} className="p-1">Register</Button></p>
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