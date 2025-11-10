import { DEFAULT_USER_PHOTO } from '../../constants';

export function Avatar({
    src,
    alt = "Avatar",
    size = "md",
    shape = "circle",
    fallback,
    className = ""
}) {
    // Tamaños en píxeles
    const sizeMap = {
        xs: 32,
        sm: 40,
        md: 48,
        lg: 64,
        xl: 80
    };

    const sizeClasses = {
        xs: "avatar-xs",
        sm: "avatar-sm",
        md: "avatar-md",
        lg: "avatar-lg",
        xl: "avatar-xl"
    };

    const shapeClasses = {
        circle: "rounded-circle",
        square: "rounded",
        rounded: "rounded-3"
    };

    const classes = `avatar ${sizeClasses[size]} ${shapeClasses[shape]} ${className}`.trim();

    // Estilos inline para controlar el tamaño
    const imgStyle = {
        width: `${sizeMap[size]}px`,
        height: `${sizeMap[size]}px`,
        objectFit: 'cover',
        objectPosition: 'center'
    };

    // Si hay error en la imagen o no existe, mostrar fallback
    const handleError = (e) => {
        if (fallback) {
            e.target.src = fallback;
        } else {
            e.target.src = DEFAULT_USER_PHOTO;
        }
    };

    return (
        <img
            src={src || DEFAULT_USER_PHOTO}
            alt={alt}
            className={classes}
            style={imgStyle}
            onError={handleError}
        />
    );
}
