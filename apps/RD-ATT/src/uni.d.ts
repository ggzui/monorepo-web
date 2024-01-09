/// <reference types="@dcloudio/types" />
/// <reference types="@ttou/uview-typings/v3" />
/// <reference types="@uni-helper/uni-ui-types" />

declare const wx: any

declare module '@climblee/uv-ui' {
  global {
    interface Uni {
      $uv: any
    }
  }
}
