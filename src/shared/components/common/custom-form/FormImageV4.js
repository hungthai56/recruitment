import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Validator from 'utils/Validator';
import ImageUploading from 'react-images-uploading';
import styles from './FormMultiImage.module.scss';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import MessageError from '../message-error/MessageError';
import IconClose from 'assets/images/icons/icon-close';
import IconAdd from 'assets/images/icons/icon-add';

const FormImageV4 = (props) => {
    const {
        // defaultValue,
        fieldName,
        validate,
        // placeholder,
        // format = '',
        maxNumber = 1,
        // handleUploadImage,
        width,
        height,
        iconNull,
        isTooltip = false
    } = props;
    const {
        formState: { errors },
        control,
    } = useFormContext();
    let arr = fieldName.split('.');
    let error = {};
    if (arr.length > 0) {
        let result = arr.reduce((rs, e) => {
            if (rs[e]) {
                return (rs = rs[e]);
            }
            return {};
        }, errors);
        error = result;
    }

    let showError = error?.message ? true : false;
    return (
        <div
            style={{

                display: 'flex',
                width: '560px',
                height: '292px',
                padding: '23px 10px',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '3px',
                border: '1px dashed var(--neutral - 5, #ACACAC)',
                background: 'var(--neutral - 1 - f - 6, #F6F6F6)',
                marginLeft: '-15px',


            }}
            className={styles.customFormImages}
        >
            <Tooltip placement="bottom"
                arrow
                classes={{ arrow: styles["arrow"], tooltip: styles["tooltip"] }}
                title={(showError && isTooltip) ? (
                    <MessageError
                        type={error?.type}
                        message={error?.message}
                        style={{ color: "red", marginTop: "0px" }}
                    />
                ) : ""}>
                <div
                    className={`w-100 h-100 d-flex justify-content-center flex-column align-items-center ${styles.borderImages}`}
                >
                    <Controller
                        control={control}
                        name={fieldName}
                        rules={{
                            validate: Validator.genValidate(
                                validate,
                                fieldName,
                            ),
                        }}
                        render={({
                            field: { onChange, onBlur, value, ref },
                        }) => {
                            const [images, setImages] = useState([]);
                            useEffect(() => {
                                setImages(value ?? []);
                            }, [value]);
                            const onChangeImage = (imageList) => {
                                const arrayIdImageList =
                                    images?.length > 0
                                        ? images?.map((image) => image?.Id)
                                        : [];
                                const newImageList = imageList.map(
                                    (image, i) => {
                                        const isUploadNewImage =
                                            arrayIdImageList?.indexOf(
                                                image?.Id,
                                            ) === -1;
                                        if (isUploadNewImage) {
                                            return {
                                                ...image,
                                                isNewImage: true,
                                                Id: 0,
                                                FileImage: image.file,
                                                Sort: 0,
                                                TempId: i + 1,
                                                Image: '',
                                                Thumb: '',
                                                IsHoverImage: false,
                                                IsMainImage: false,
                                            };
                                        }
                                        return image;
                                    },
                                );
                                onChange(newImageList);
                            };
                            return (
                                <div
                                    className="w-100 h-100"
                                    ref={ref}
                                    onFocus={() => { }}
                                >
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChangeImage}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            dragProps,
                                            onImageUpload,
                                            onImageRemove,
                                        }) => (
                                            <div className="w-100 h-100">
                                                {images &&
                                                    images?.map(
                                                        (image, index) => (
                                                            <div
                                                                className="w-100 h-100"
                                                                key={index}
                                                            >
                                                                <div
                                                                    className={`w-100 h-100 ${styles.imagesShow}`}
                                                                >
                                                                    <img
                                                                        src={
                                                                            image?.data_url
                                                                        }
                                                                        className="w-100 h-100"
                                                                        style={{
                                                                            objectFit:
                                                                                'cover',
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className={`${styles.icon} ${styles.iconClose}`}
                                                                        onClick={
                                                                            onImageRemove
                                                                        }
                                                                    >
                                                                        <IconClose
                                                                            fontSize={
                                                                                8
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ),
                                                    )}
                                                {images?.length === 0 ? (
                                                    <div
                                                        className={`${styles.uploadImageSection
                                                            } ${errors?.image
                                                                ? 'error'
                                                                : ''
                                                            }`}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                    >
                                                        {iconNull}
                                                    </div>
                                                ) : (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            gap: '10px',
                                                        }}
                                                    ></div>
                                                )}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            );
                        }}
                    />
                    {error?.message && !isTooltip && (
                        <div className={styles.errorMessageImages} style={{bottom: '-44px'}}>
                            <MessageError
                                type={error?.type}
                                message={error?.message}
                            />
                        </div>
                    )}
                </div>
            </Tooltip>
        </div >
    );
};
FormImageV4.defaultProps = {
    placeholder: 'Vui lòng nhập ...',
    width: 150,
    height: 130,
    iconNull: (
        <>
            <IconAdd />
        </>
    ),
};
FormImageV4.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    iconNull: PropTypes.element,
};
export default FormImageV4;
