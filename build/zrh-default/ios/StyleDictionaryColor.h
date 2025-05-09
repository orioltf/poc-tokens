
//
// StyleDictionaryColor.h
//

// Do not edit directly, this file was auto-generated.


#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
NeutralsBlack,
NeutralsLightGrey,
NeutralsWhite,
NeutralsGrey,
Primary04,
Primary05,
Primary06,
Primary07,
Primary08,
Primary09,
Primary02,
Primary01,
Primary03,
TertiaryAlert,
TertiaryWarning,
TertiaryError,
TertiaryPositive,
TertiaryWarningBright,
TertiaryDisabled,
TertiaryErrorBright,
Secondary10,
Secondary11,
Secondary12,
Secondary13,
Secondary09,
Secondary01,
Secondary02,
Secondary03,
Secondary04,
Secondary05,
Secondary06,
Secondary07,
Secondary08,
EffectsShadowGlobalColor16,
EffectsShadowGlobalColor24,
EffectsShadowGlobalColor8,
EffectsGlowPrimary01,
EffectsGlowPositive,
EffectsGlowWarning,
EffectsGlowAlert,
EffectsGlowError,
EffectsGlowSecondary09
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end