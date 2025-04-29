import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-lg font-bold">
              {t('name')}
            </div>
            <div className="text-slate-400">
              {t('title')}
            </div>
          </div>
          
          <div className="text-slate-400 text-sm">
            {t('footer.copyright', { year: currentYear })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
