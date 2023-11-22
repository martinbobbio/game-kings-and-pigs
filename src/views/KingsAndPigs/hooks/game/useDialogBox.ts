import { useMemo, useState } from 'react';
import {
  DialogBoxTextures,
  DialogBoxAnimations,
  DialogBoxState,
} from '../../interfaces';

interface useDialogBoxProps {
  textures: DialogBoxTextures;
}

const useDialogBox = ({ textures }: useDialogBoxProps) => {
  const animations = useMemo(() => {
    const animations: DialogBoxAnimations = {
      hello: {
        autoplay: true,
        loop: false,
        frameBuffer: 16,
        frameRate: 5,
        texture: textures.hello,
        invertedTile: true,
      },
      exclamation: {
        autoplay: true,
        loop: false,
        frameBuffer: 16,
        frameRate: 5,
        texture: textures.exclamation,
        invertedTile: true,
      },
      dead: {
        autoplay: true,
        loop: false,
        frameBuffer: 16,
        frameRate: 5,
        texture: textures.dead,
        invertedTile: true,
      },
    };
    return animations;
  }, [textures]);

  const [dialogBox, setDialogBox] = useState<DialogBoxState>({
    dialog: undefined,
    deleteDialog: () => {
      setDialogBox((prev) => ({ ...prev, dialog: undefined }));
    },
    addDialog: (key: keyof DialogBoxAnimations) => {
      const currentAnimation = animations[key];
      const dialog = {
        currentAnimation,
      };
      setDialogBox((prev) => ({ ...prev, dialog }));
      currentAnimation.onComplete = () => {
        setDialogBox((prev) => ({ ...prev, dialog: undefined }));
      };
    },
  });

  return {
    dialogBox,
  };
};

export default useDialogBox;
