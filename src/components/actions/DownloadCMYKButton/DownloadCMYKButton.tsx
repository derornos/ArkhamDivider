// import S from './DownloadCMYKButton.module.scss';

import { createZipRenderer as createZipRenderer, CreateDividerZipOptions } from "@/features/zip/createZipRenderer";
import { DownloadButton } from "../DownloadButton/DownloadButton";
import { rgb2cmyk } from "@/features/image/rgb2cmyk";
import { getSimilarBleed } from "@/features/render/getSimilarBleed";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectLayout } from "@/store/features/layout/layout";
import { useTranslation } from "react-i18next";

export type DownloadCMYKButtonProps = {
  mapRenderResponse?: CreateDividerZipOptions['transformResponse']
}

export const DownloadCMYKButton = ({}: DownloadCMYKButtonProps) => {

  const { t } = useTranslation();

  const layout = useAppSelector(selectLayout);

  const bleed = getSimilarBleed(layout.bleed);

  const bleedText = bleed.size.toFixed(1);
  const bleedTranslation = t('Bleed').toLowerCase();
  const name = `Arkham Divider (${bleedTranslation} ${bleedText}mm)`;

  const renderer = createZipRenderer({
    name,
    imageFormat: 'tiff',
    bleed,
    transformResponse: rgb2cmyk
  });

  return (
    <DownloadButton
      renderer={renderer}
    >
      TIFF
    </DownloadButton>
  );
}