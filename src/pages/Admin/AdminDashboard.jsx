import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchAPI } from '../../utils/commonServices';
import SidebarContainer from '../../commonComponents/SideBarContainer';
import AppConfigInput from './AppConfigInput';
import Button from '../../commonComponents/Button';

const AdminSection = ({ title, description, subDescription, buttonName, configValue, imageData }) => {
    const isApplicationAvatar = title === 'Application Avatar';
    const isApplicationConfig = title === 'Application Configurations';
    const isResetApp = title === 'Reset Application';

    // State Variables
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const methods = {
        handleReset: async (onlyId = true) => {
            try {
                setIsButtonLoading(true);
                const URL = onlyId ? '/admin/resetid' : '/admin/resetapplication';
                await fetchAPI(URL);
                toast.success('Reset Completed');
            } catch (error) {
                toast.error('Unable to Reset.');
                console.error('[AdminMenu.jsx][HandleReset] Error - ', error.message);
            } finally {
                setIsButtonLoading(false);
            }
        },
        handleLogoChange: (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = async () => {
                    await fetchAPI(`/admin/update/logo`, 'PUT', { config_value: reader.result });
                    window.location.reload();
                };
                reader.readAsDataURL(file);
            }
        },
    };

    return (
        <div className="container bg-white my-5 shadow rounded-3xl overflow-hidden text-sm admin-section">
            <section className={`p-3 px-5 ${isApplicationAvatar ? 'flex items-center justify-between' : ''}`}>
                <div>
                    <p className="text-lg font-semibold my-2">{title}</p>
                    <p>{description}</p>
                </div>

                {isApplicationConfig && (
                    <>
                        {configValue.map((config, index) => (
                            <AppConfigInput config={config} key={index} />
                        ))}
                        <AppConfigInput addConfig />
                    </>
                )}

                {isApplicationAvatar && (
                    <div>
                        <label htmlFor="myInput" className="cursor-pointer">
                            <img
                                src={imageData}
                                alt="Logo"
                                className="ring-1 ring-black w-20 h-20 object-cover rounded-full overflow-hidden"
                            />
                        </label>
                        <input id="myInput" style={{ display: 'none' }} type={'file'} onChange={methods.handleLogoChange} />
                    </div>
                )}
            </section>

            <section className="bg-gray-200 p-3 px-5 flex items-center justify-between text-sm">
                <p>{subDescription}</p>
                {buttonName && <Button title={buttonName} isLoading={isButtonLoading} onClick={() => methods.handleReset(!isResetApp)} />}
            </section>
        </div>
    );
};

export default function AdminDashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [appConfig, setAppConfig] = useState([]);
    const [logoData, setLogoData] = useState([]);

    useEffect(() => {
        async function getConfigValues() {
            try {
                const result = await fetchAPI('/admin');
                const logoData = result.find((config) => config.config_name == 'logo');

                setAppConfig(result.filter((config) => config.config_name != 'logo'));
                setLogoData(logoData.config_value);
            } catch (error) {
                toast.error('Unable to fetch App Config API');
                console.error('[AdminMenu.jsx][getConfigValues] Error - ', error.message);
            } finally {
                setIsLoading(false);
            }
        }
        getConfigValues();
    }, []);

    return (
        <SidebarContainer isLoading={isLoading}>
            <div className=" px-7 py-2 w-full h-full">
                <AdminSection
                    title="Application Configurations"
                    description="This is your team's visible name. For example, the name of your company or department."
                    subDescription="Please use 8 characters at maximum."
                    configValue={appConfig}
                />
                <AdminSection
                    title="Application Avatar"
                    description="This is your team's avatar. Click on the avatar to upload a custom one from your files."
                    subDescription="Please use below 1mb for optimization."
                    imageData={logoData}
                />
                <AdminSection
                    title="Reset Application"
                    description="This will clear all data from the Players and Team Details from the database."
                    subDescription="Warning! Proceed with caution."
                    buttonName="Reset"
                />
                <AdminSection
                    title="Reset Id's"
                    description="This will reset the Primary Key Id in all the tables."
                    subDescription="Warning! Proceed with caution."
                    buttonName="Reset"
                />
                {/* <AdminSection
                    title="Move to Local"
                    description="This will move the images to the local repository."
                    subDescription="Check Firebase bandwidth before moving."
                    buttonName="Move"
                /> */}
            </div>
        </SidebarContainer>
    );
}
