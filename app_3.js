const getG = () => ({
    gc: [...getGroup('math_grades'), ...getGroup('eng_grades'),],
    ecg: [...getGroup('ecg_grades'),],
    ep: getInput('mod_epro'),
    cie: getInput('mod_cie'),
    TPI: getInput('mod_tpi'),
    w: getGroup('weights')
})
const getGroup = id => Array.from(document.getElementById(id).getElementsByTagName('input')).map(i => parseFloat(i.value))
const getInput = id => parseFloat(document.getElementById(id).value)
const inId = (id, v) => document.getElementById(id).innerText = v
const avg = (g, w = null) => {
    let s = g.map((e, i) => w ? [e, w[i]] : [e, 1]).filter(e => !isNaN(e[0])).reduce((a, n) => [a[0] + (n[0] * n[1]), a[1] + n[1]], [0, 0])
    return s[0] / s[1]
}
const r = (n, m) => Math.round(n / m) * m

function calculateAllAverages() {
    let g = getG()
    g.gc_avg = r(avg(g.gc), 0.5)
    g.ecg_avg = r(avg(g.ecg), 0.5)
    g.cp_avg = r(avg([g.ep, g.cie], [g.w[0], g.w[1]]), 0.1)
    g.mg = r(avg([g.gc_avg, g.ecg_avg, g.cp_avg, g.TPI], [g.w[2], g.w[3], g.w[4], g.w[5]]), 0.1)
    inId('avg_conn_general', g.gc_avg)
    inId('avg_ecg', g.ecg_avg)
    inId('avg_comp_pro', g.cp_avg)
    inId('avg_general', g.mg)
}

window.addEventListener('load', () => {
    calculateAllAverages()
    Array.from(document.getElementsByTagName('input')).forEach(i => i.addEventListener('change', calculateAllAverages))
})