# ONCALL visual acceptance record

> **Accepted direction:** a dark clinical records room, tactile physical files and the original night-shift capybara character.

This file records the visual decisions Erdem explicitly accepted during the 2026-09-06 design sessions. It also marks the boundary between approved rendered references and a future articulated 3D character.

## Accepted design decisions

1. **Clinical file metaphor.** The primary experience is a records room, with eight physical chart folders acting as navigation. Opening a file reveals complete editorial material on ivory paper within the same environment.
2. **Opening and Science states.** The opening room and the magnifying-glass Science inspection composition were accepted as the visual targets for closed-file and opened-file states.
3. **Character reference.** The capybara turntable was accepted as the front, three-quarter, side and back model reference: calm half-lidded expression, natural warm-brown fur, petrol-teal scrubs, dark stethoscope and restrained coral badge.
4. **Responsive text-free plates.** Separate desktop and portrait opening plates were accepted so all headings and folder labels remain accessible live HTML rather than baked raster text.
5. **Folder typography.** Erdem required the number, accent and label on each folder to run parallel with its physical spine. The implementation keeps each hit target rectangular and accessible while applying the plate-matched angle to the shared printed layer.

## Immutable asset register

| Approved asset | Role | Introduced | SHA-256 |
| --- | --- | --- | --- |
| [`oncall-opening-desktop-text-free-approved-v1.png`](../../assets/concepts/oncall-opening-desktop-text-free-approved-v1.png) | Wide opening plate; live title and eight links overlay the blank wall and spines | `dac2c9e` | `b997f89b186257e319ad07872da1610c6590ebcbf9126c3e3170c0c51ff78962` |
| [`oncall-opening-mobile-text-free-approved-v1.png`](../../assets/concepts/oncall-opening-mobile-text-free-approved-v1.png) | Independently composed portrait opening plate | `dac2c9e` | `8872d1ff4ee9402e922773e66ceb91b57ac72facdaa980416bf25a61e26c3325` |
| [`oncall-science-open-approved-v1.png`](../../assets/concepts/oncall-science-open-approved-v1.png) | Open Science file and evidence-inspection target | `7406e69` | `e04bcb3b27c6398675870fe138caa56ef29bc34c644b200ac904083dae734601` |
| [`oncall-3d-turntable-approved-v1.png`](../../assets/concepts/oncall-3d-turntable-approved-v1.png) | Character consistency reference for a later production rig | `d49d665` | `b30017f5a277f213044c8ae9d73402006c4ca91ec3b7a3b27a0864ececa24426` |
| [`oncall-idle-pose-approved-v1.png`](../../assets/concepts/oncall-idle-pose-approved-v1.png) | Transparent idle cutout and static fallback | `d49d665` | `1ab1b5abfca385852657c650923ba476a1742e612e8dbcca6e8e00312a3c254e` |
| [`oncall-open-file-scene-plate-v1.png`](../../assets/concepts/oncall-open-file-scene-plate-v1.png) | Blank opened-file scene behind semantic HTML content | `d49d665` | `64daf10c505b5ffa37357df2f5594681c05eec8e2d80f7441188ae5102c92aba` |

The broader [visual asset manifest](../../assets/github/README.md) records dimensions, earlier direction art, GitHub presentation assets and provenance.

## Implementation evidence

The accepted direction is implemented by the cinematic shell through these recorded revisions:

- `dac2c9e` integrates the text-free responsive plates, places one live ONCALL heading and aligns eight live folder links with the photographed spines.
- `adc7790` removes the obsolete flat Chart mascot and masks the pulled folder paper edge while retaining a stationary backing surface.
- Desktop, tablet, mobile and small-mobile evidence covers opening, mid-selection, opened file, Science, rapid second selection and spine close-ups.
- Automated interaction checks cover native-link fallback, keyboard activation, browser history, rapid-selection cancellation, no-JavaScript behavior, reduced motion and 320 px overflow.
- The final Science/content work retains the deep green, near-black, ivory, warm fur, teal and coral system across all thirteen generated routes.

Technical review and screenshot capture verify implementation behavior. They do not substitute for a human claim about artistic preference. The approvals recorded here apply to the listed concepts, assets and requested spine-label treatment; they do not assert that every later pixel or every future viewport received a separate human sign-off.

## 3D and publication boundary

The current cinematic experience uses approved rendered plates, CSS movement and accessible HTML content. The turntable is a visual reference image. It is not a textured, rigged or articulated 3D model, and the site does not claim otherwise.

A production 3D phase would still require model construction, topology and texture review, rigging, movement studies, performance budgets, reduced-motion behavior and a separate visual acceptance record. Publishing or deploying the website is also a separate action from accepting these design references.
