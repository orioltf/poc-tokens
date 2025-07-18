
//
// StyleDictionaryColor.m
//

// Do not edit directly, this file was auto-generated.


#import "StyleDictionaryColor.h"

@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.984f green:0.984f blue:0.984f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.671f green:0.671f blue:0.671f alpha:1.000f],
[UIColor colorWithRed:0.078f green:0.078f blue:0.196f alpha:1.000f],
[UIColor colorWithRed:0.357f green:0.357f blue:0.439f alpha:1.000f],
[UIColor colorWithRed:0.537f green:0.537f blue:0.596f alpha:1.000f],
[UIColor colorWithRed:0.725f green:0.725f blue:0.761f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.863f blue:0.906f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.969f blue:0.984f alpha:1.000f],
[UIColor colorWithRed:0.039f green:0.039f blue:0.510f alpha:1.000f],
[UIColor colorWithRed:0.078f green:0.082f blue:0.980f alpha:1.000f],
[UIColor colorWithRed:0.388f green:0.435f blue:0.600f alpha:1.000f],
[UIColor colorWithRed:0.914f green:0.478f blue:0.282f alpha:1.000f],
[UIColor colorWithRed:0.980f green:0.784f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.875f green:0.008f blue:0.106f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.529f blue:0.212f alpha:1.000f],
[UIColor colorWithRed:0.996f green:0.937f blue:0.702f alpha:1.000f],
[UIColor colorWithRed:0.725f green:0.725f blue:0.761f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.212f blue:0.294f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.725f blue:0.639f alpha:1.000f],
[UIColor colorWithRed:0.078f green:0.078f blue:0.196f alpha:1.000f],
[UIColor colorWithRed:0.039f green:0.039f blue:0.510f alpha:1.000f],
[UIColor colorWithRed:0.510f green:0.824f blue:0.941f alpha:1.000f],
[UIColor colorWithRed:0.196f green:0.863f blue:0.784f alpha:1.000f],
[UIColor colorWithRed:0.392f green:0.294f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.784f green:0.588f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.980f green:0.980f blue:0.588f alpha:1.000f],
[UIColor colorWithRed:0.314f green:0.118f blue:0.118f alpha:1.000f],
[UIColor colorWithRed:0.549f green:0.118f blue:0.157f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.588f blue:0.471f alpha:1.000f],
[UIColor colorWithRed:0.098f green:0.196f blue:0.196f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.314f blue:0.314f alpha:1.000f],
[UIColor colorWithRed:0.039f green:0.039f blue:0.510f alpha:0.161f],
[UIColor colorWithRed:0.039f green:0.039f blue:0.510f alpha:0.239f],
[UIColor colorWithRed:0.039f green:0.039f blue:0.510f alpha:0.078f],
[UIColor colorWithRed:0.039f green:0.039f blue:0.510f alpha:0.302f],
[UIColor colorWithRed:0.000f green:0.529f blue:0.212f alpha:0.302f],
[UIColor colorWithRed:0.980f green:0.784f blue:0.000f alpha:0.302f],
[UIColor colorWithRed:0.914f green:0.478f blue:0.282f alpha:0.302f],
[UIColor colorWithRed:0.875f green:0.008f blue:0.106f alpha:0.302f],
[UIColor colorWithRed:0.196f green:0.863f blue:0.784f alpha:0.302f]
    ];
  });

  return colorArray;
}

@end