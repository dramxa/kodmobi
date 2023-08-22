<template>
  <div>
    <div class="px-4 py-6 text-base font-bold">
        <span class="text-green-500 pr-2">GET</span> <span>Check Channel</span>
    </div>
    <div class="mx-4 py-1.5 px-2.5 text-xs rounded-[3px] border border-gray-200 bg-gray-50">https://api.kod.mobi/api/v2/channel/check?session_id=&type=sms</div>
    <div class="mx-4 mt-8 text-sm">
        <div class="border-b border-gray-200">
            <span class="font-bold pr-2">AUTHORIZATION</span> <span class="text-gray-500">API Key</span>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">Key</div>
            <div class="col-span-9">x-api-key</div>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">Value</div>
            <div class="col-span-9">1e78ea49-9f37-40a0-8489-6d82c300ac71</div>
        </div>
        <div class="border-b border-gray-200 mt-4">
            <span class="font-bold pr-2">PARAMS</span>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">session_id</div>
            <div class="col-span-9"></div>
        </div>
        <div class="grid grid-cols-12 mt-2.5 text-xs">
            <div class="col-span-3 font-bold">type</div>
            <div class="col-span-9">sms</div>
        </div>
    </div>
    <div class="m-4 mt-8 p-4 bg-gray-700 rounded-lg text-xs" style="font-family: monospace;">
        <span class="text-white">curl --location --request </span>
        <span class="text-rose-500">GET </span>
        <span class="text-green-500">'https://api.kod.mobi/api/v2/channel/check?session_id=&type=sms' </span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>