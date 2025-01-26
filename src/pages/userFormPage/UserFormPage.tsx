import FormSection from "./FormSection";
import Header from "./Header";
import UserFormCss from "./UserFormPage.module.css"


function UserFormPage() {
    return (
      <div className={UserFormCss.app}>
        <Header />
        <FormSection />
      </div>
    );
  };
export default UserFormPage;
