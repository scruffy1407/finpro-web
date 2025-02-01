import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { closeModalAction, openModalAction } from "@/store/slices/ModalSlice";
import ModalContainer from "@/components/Modal/ModalContainer";
import DisclaimerModal from "@/components/Modal/DisclaimerModal";
import { Toaster } from "@/components/ui/sonner";

const AppWithModal = ({ Component, pageProps }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentModalId } = useSelector(
    (state: RootState) => state.modalController,
  );

  const handleCloseModal = () => {
    dispatch(closeModalAction());
    sessionStorage.setItem("hasSeenDisclaimer", "true");
  };

  useEffect(() => {
    const hasSeenDisclaimer = sessionStorage.getItem("hasSeenDisclaimer");
    if (!hasSeenDisclaimer) {
      dispatch(openModalAction("disclaimerModal"));
    }
  }, [dispatch]);

  return (
    <>
      <Component {...pageProps} />
      <ModalContainer
        isOpen={currentModalId === "disclaimerModal"}
        onClose={handleCloseModal}
      >
        <DisclaimerModal />
      </ModalContainer>
      <Toaster
        closeButton={true}
        richColors={true}
        theme={`light`}
        position={`top-right`}
      />
    </>
  );
};

export default AppWithModal;
